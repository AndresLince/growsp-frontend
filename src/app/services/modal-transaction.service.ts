import { BudgetDetailService } from './budget-detail.service';
import { BudgetService } from './budget.service';
import { AccountService } from './account.service';
import { TransactionCategoryService } from './transaction-category.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class ModalTransactionService {

  public transactionForm=this.fb.group({
    type:[
      '',
      [Validators.required]
    ],
    account:[
      '',
      [Validators.required]
    ],
    category:[
      '',
      [Validators.required]
    ],
    description:[
      '',
      [Validators.required]
    ],
    value:[
      '',
      [Validators.required]
    ],
    quantity:[
      '',
      [Validators.required]
    ]
    ,
    date:[
      '',
      [Validators.required]
    ]
    ,
    total:[
      ''
    ]
  });
  public category_name:string='';
  public account_name:string='';
  public budget_name:string='';
  public budgetdetail_name:string='';
  public modalTitle:string='';
  public modalType:number=1;
  public id_transaction:string='';


  public categories=[];
  public accounts=[];
  public budgets=[];
  public budgetDetails=[];

  private _ocultarModal:boolean=true;

  constructor(public fb:FormBuilder,
    public transactionCategoryService:TransactionCategoryService,
    public accountService:AccountService,
    public budgetService:BudgetService,
    public budgetDetailService:BudgetDetailService
    ) { }

  get ocultarModal(){

    return this._ocultarModal;
  }

  abrirModal(
    transaction:Transaction,
    type:number
  ){

    //Si se abre para editar una transaccion
    this.modalTitle='Crear Transacción';
    this.transactionForm.controls['date'].setValue('');
    this.modalType=type;
    if(type===2){

      this.id_transaction=transaction.id_transaction;
      this.modalTitle='Editar Transacción';
      this.transactionForm.controls['date'].setValue(transaction.dateString);
    }

    this.transactionForm.controls['description'].setValue(transaction.description);
    this.transactionForm.controls['value'].setValue(transaction.value);
    this.transactionForm.controls['quantity'].setValue(transaction.quantity);
    this.transactionForm.controls['total'].setValue(transaction.netValue);
    this.transactionForm.controls['type'].setValue(transaction.type);

    this.transactionCategoryService.getTransactionCategories(0,'no-filter',1,transaction.type).subscribe(
      resp=>{

        this.categories=resp.transactionCategories;
        this.category_name=transaction.category_name;
        this.account_name=transaction.account_name;
        this.transactionForm.controls['account'].setValue(transaction.account_name);
        this.transactionForm.controls['category'].setValue(transaction.category_name);

        this.accountService.getAccount().subscribe(
          resp=>{

            this.accounts=resp.accounts;
            this.budgetService.getBudgets().subscribe(resp=>{

              this.budget_name=transaction.budget_name;
              this.budgets=resp.budgets;
              this._ocultarModal=false;

            })
          }
        );

      }
    );
  }

  abrirModalWithoutTransaction(
    type:number
  ){    
    //Si se abre para editar una transaccion
    this.modalTitle='Crear Transacción';
    this.transactionForm.controls['date'].setValue('');
    this.modalType=type;
    this.transactionForm.controls['type'].setValue(type);
    this.transactionCategoryService.getTransactionCategories(0,'no-filter',1,type).subscribe(
      resp=>{
        this.categories=resp.transactionCategories;        
        this.transactionForm.controls.category.patchValue(this.categories[0].name);
        this.accountService.getAccount().subscribe(
          resp=>{
            this.accounts=resp.accounts;
            this.transactionForm.controls.account.patchValue(this.accounts[0].name);
            this.budgetService.getBudgets().subscribe(resp=>{
              this.budgets=resp.budgets;
              this._ocultarModal=false;

            })
          }
        );

      }
    );
  }

  closeModal(){

    this._ocultarModal=true;
  }

  budgetChange(name:string){

    this.budgetDetailService.getBudgetDetails(name).subscribe(resp=>{
      this.budgetDetails=resp.budgetDetails;
    })
  }

}

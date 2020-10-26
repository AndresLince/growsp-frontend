import  Swal  from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from './../../services/transaction.service';
import { Transaction } from './../../models/transaction.model';
import { BudgetDetailService } from './../../services/budget-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styles: [
  ]
})
export class BudgetDetailComponent implements OnInit {

 

  public id:string;
  public budgetDetail:{name:'asdasd',value:0,totalTransactions:0,description:'name'};
  public budgetDetailTransactions:Transaction[];
  public filter:string='no-filter';
  public filterTransaction:string;

  public totalTransactions:number=0;
  public totalbudgetDetailTransactions:number=0;
  
  public totalTransactionsTemp:number=0;
  public desde:number=0;
  public budgetDetailTransactionsTemp:Transaction[];
  public transactions:Transaction[];
  public transactionsTemp:Transaction[];
  public selectedTransaction:Transaction; 

  constructor(private route: ActivatedRoute,  
    private budgetDetailService:BudgetDetailService,
    private transactionService:TransactionService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get("id");
    this.getBudgetDetail(false);    
  }

  getBudgetDetail(refreshTransactions:boolean){

    this.budgetDetailService.getBudgetDetail(this.id).subscribe(resp=>{
      this.budgetDetail=resp.budgetDetail;
      console.log(resp.budgetDetail);
      this.getBudgetDetailTransactions(0,this.filter,refreshTransactions);
    });
  }

  getBudgetDetailTransactions(desde:number,filter:string,refreshTransactions:boolean){

    this.budgetDetailService.getBudgetDetailTransactions(this.id,desde,filter).subscribe(resp=>{

      this.budgetDetailTransactions=resp.budgetDetailTransactions;
      this.budgetDetailTransactionsTemp=resp.budgetDetailTransactions;   
      this.totalbudgetDetailTransactions=resp.total;

      if(refreshTransactions){
        this.getTransactions(0,this.filterTransaction,false);  
      }
        
    });

  }

  search(termino:string){
    this.filter=termino;

    if(termino.length===0){
      console.log("entra");
      
      //this.totalTransactions=this.totalbudgetDetailTransactions;
      //this.budgetDetailTransactions=this.budgetDetailTransactionsTemp;
      this.filter='no-filter';
      //return;
    }
    this.desde=0;
    
    this.getBudgetDetailTransactions(this.desde,this.filter,true);
  }

  getTransactions(desde:number,filter:string='',search){
    
    this.transactionService.getTransactions(0,filter,0).subscribe(({total,transactions})=>{      

      this.totalTransactions=total;
      this.transactions=transactions;
      if(!search){        
        
        this.transactionsTemp=transactions;
        this.totalTransactionsTemp=total;
      }        
    });
  }

  searchTransaction(termino:string){
    this.filterTransaction=termino;

    if(termino.length===0){      
      
      /*this.totalTransactions=this.totalbudgetDetailTransactions;
      this.transactions=this.transactionsTemp;*/
      this.totalTransactions=0;
      this.transactions=[];
      //this.filterTransaction='no-filter';
      return;
    }
    this.desde=0;
    this.getTransactions(this.desde,this.filterTransaction,true);
  }

  refreshTransactions(transaction:Boolean){
    
    this.getBudgetDetail(true); 
  }

  addTransaction(insertId:number){

    const data={id_budget_detail:this.id,id_transaction:insertId};        
    this.budgetDetailService.createTransaction(data).subscribe(
      resp=>{
        
        this.getBudgetDetail(true); 
      },err=>{
        
        let errorResponse='';
        if(err.error.msg){
          errorResponse=err.error.msg;
        }
        
        Swal.fire('Error',errorResponse,'error');
      }
    );
  }

  changePageBudgetDetailTransactions(desde:number){

    this.desde=desde;
    this.getBudgetDetailTransactions(this.desde,this.filter,false);
    
  }


 

}

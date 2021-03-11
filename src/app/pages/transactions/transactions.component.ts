import { ModalTransactionService } from './../../services/modal-transaction.service';
import { Account } from './../../models/account.model';
import { ModalAdjustmentAccountService } from './../../services/modal-adjustment-account.service';
import { AccountService } from './../../services/account.service';
import { Transaction } from './../../models/transaction.model';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { faWrench} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {
  @ViewChild('txtTermino') txtTermino;

  constructor(
    private transactionService:TransactionService,
    private accountService:AccountService,
    private modalAdjustmentAccountService:ModalAdjustmentAccountService,
    public modalTransactionService:ModalTransactionService,
  ) { }

  public totalTransactions:number=0;
  public totalTransactionsTemp:number=0;
  public accounts:any[];
  public desde:number=0;
  public transactions:Transaction[];
  public transactionsTemp:Transaction[];
  public cargando:Boolean=true;
  public filter:string='no-filter';
  public prueba:number=0;
  faWrench = faWrench;

  ngOnInit(): void {
    this.getTransactions(this.desde,this.filter,false);
  }



  getTransactions(desde:number,filter:string='',search){

    this.transactionService.getTransactions(desde,filter,0).subscribe(({total,transactions})=>{

      this.totalTransactions=total;
      this.transactions=transactions;
      if(!search){

        this.transactionsTemp=transactions;
        this.totalTransactionsTemp=total;
      }

      this.cargando=false;

      this.accountService.getAccountsTotals().subscribe(resp=>{
        this.accounts=resp.accounts;
      })
    });
  }

  search(termino:string){

    this.filter=termino;

    if(termino.length===0){

      this.filter='no-filter';
    }
    this.desde=0;
    this.getTransactions(this.desde,this.filter,true);
  }

  refreshTransactions(event){
    this.txtTermino.nativeElement.value = '';
    this.getTransactions(0,'',false);
  }

  changePage(valor:number){

    this.desde=valor;

    this.getTransactions(this.desde,this.filter,true);
  }

  showAdjustPage(account:Account){

    this.modalAdjustmentAccountService.abrirModal(account);
  }

  abrirModal(type:number){

    this.modalTransactionService.abrirModalWithoutTransaction(type);
  }




}

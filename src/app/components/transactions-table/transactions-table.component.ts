import  Swal  from 'sweetalert2';
import { ModalTransactionService } from './../../services/modal-transaction.service';
import { Transaction } from './../../models/transaction.model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { faEdit,faPlusCircle,faLink } from '@fortawesome/free-solid-svg-icons';
import { BudgetDetailService } from 'src/app/services/budget-detail.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html'
})
export class TransactionsTableComponent implements OnInit {

  @Input() transactions: any;
  @Input() fromTransactions=false;
  @Input() id:number;
  @Output() refreshTransactions:EventEmitter<boolean>=new EventEmitter;

  faEdit = faEdit;
  faPlusCircle = faPlusCircle;
  faLink=faLink;

  constructor(
    public modalTransactionService:ModalTransactionService,
    public budgetDetailService:BudgetDetailService
  ) { }

  ngOnInit(): void {


    console.log("id",this.id);
  }

  abrirModal(transaction:Transaction,type:number){

    this.modalTransactionService.abrirModal(transaction,type);
  }

  add(transaction:Transaction){

    const data={id_budget_detail:this.id,id_transaction:transaction.id_transaction};
    //this.refreshTransactions.emit(true);
    this.budgetDetailService.createTransaction(data).subscribe(
      resp=>{

        this.refreshTransactions.emit(true);
      },err=>{

        let errorResponse='';
        if(err.error.msg){
          errorResponse=err.error.msg;
        }

        Swal.fire('Error',errorResponse,'error');
      }
    );
  }



}

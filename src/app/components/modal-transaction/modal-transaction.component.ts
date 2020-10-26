import { Transaction } from './../../models/transaction.model';
import { TransactionService } from './../../services/transaction.service';
import { ModalTransactionService } from './../../services/modal-transaction.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styles: [
  ]
})
export class ModalTransactionComponent implements OnInit {

  @Output() refreshTransactionEvent:EventEmitter<number>=new EventEmitter; 
  total:number;

  constructor(
    
    public modalTransactionService:ModalTransactionService,
    public transactionService:TransactionService,    
  ) { }

  ngOnInit(): void {
    console.log("Inicializa el componente");
  }

  closeModal(){
    this.modalTransactionService.closeModal();
  }
  
  enviarDatos(){
    
    if(this.modalTransactionService.modalType===2){

      this.transactionService.editTransaction(this.modalTransactionService.id_transaction,this.modalTransactionService.transactionForm.value).subscribe(resp=>{
            
        this.closeModal();
        this.refreshTransactionEvent.emit(1);          
        
      },
      err=>{

        let errorResponse='';
        if(err.error.msg){
          errorResponse=err.error.msg;
        }else{
          const json=err.error.errors;
          
          for (let i in json) {
            
            errorResponse=json[i].msg;      
          }
        }
        
        Swal.fire('Error',errorResponse,'error');
      })
    }else{

      this.transactionService.createTransaction(this.modalTransactionService.transactionForm.value).subscribe((resp:any)=>{
            
        this.closeModal();
        this.refreshTransactionEvent.emit(resp.transaction.insertId);          
        
      },
      err=>{
        
        const json=err.error.errors;
        let errorResponse='';
        for (let i in json) {
          
          errorResponse=json[i].msg;      
        }
        
        Swal.fire('Error',errorResponse,'error');
      })
    }   
  }
  calcularTotal(){
      
      const form=this.modalTransactionService.transactionForm.value;
      if(form.value&&form.quantity){

        this.total=form.value*form.quantity;
      }
  }

 
}

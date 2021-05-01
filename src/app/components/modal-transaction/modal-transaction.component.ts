import { UtilsService } from './../../services/utils.service';
import { TransactionService } from './../../services/transaction.service';
import { ModalTransactionService } from './../../services/modal-transaction.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
    public utilsService:UtilsService
  ) { }

  ngOnInit(): void {
    console.log("Inicializa el componente");
  }

  closeModal(){
    this.modalTransactionService.closeModal();
  }
  
  enviarDatos(){    
    this.utilsService.changeLoading(true);
    if(this.modalTransactionService.modalType===2){
      this.transactionService.editTransaction(this.modalTransactionService.id_transaction,this.modalTransactionService.transactionForm.value).subscribe(resp=>{            
        this.closeModal();
        this.refreshTransactionEvent.emit(1); 
      },
      err=>{
        this.utilsService.showAlertError(err);
        this.utilsService.changeLoading(false);
      },()=>{
        this.utilsService.changeLoading(false);
      })
    }else{
      this.transactionService.createTransaction(this.modalTransactionService.transactionForm.value).subscribe((resp:any)=>{            
        this.closeModal();
        this.refreshTransactionEvent.emit(resp.transaction.insertId);                  
      },
      err=>{
        this.utilsService.showAlertError(err);
        this.utilsService.changeLoading(false);
      },()=>{
        this.utilsService.changeLoading(false);
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

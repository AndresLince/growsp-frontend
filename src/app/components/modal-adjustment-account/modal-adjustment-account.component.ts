import  Swal  from 'sweetalert2';
import { AccountService } from './../../services/account.service';
import { ModalAdjustmentAccountService } from './../../services/modal-adjustment-account.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-adjustment-account',
  templateUrl: './modal-adjustment-account.component.html' 
})
export class ModalAdjustmentAccountComponent implements OnInit {

  @Output() refreshTransactionEvent:EventEmitter<number>=new EventEmitter; 

  constructor(
    public modalAdjustmentAccountService:ModalAdjustmentAccountService,
    public accountService:AccountService
  ) { }

  ngOnInit(): void {
  }
  closeModal(){

    this.modalAdjustmentAccountService.closeModal();
  }

  enviarDatos(){
    
    this.accountService.createAdjustment(this.modalAdjustmentAccountService.adjustmentForm.getRawValue()).subscribe(resp=>{
      this.refreshTransactionEvent.emit(1);
      Swal.fire(
        'Buen trabajo!',
        'Ajuste creado correctamente',
        'success'
      );
      this.closeModal();
      this.modalAdjustmentAccountService.adjustmentForm.controls['value'].setValue(0);
      this.modalAdjustmentAccountService.adjustmentForm.controls['date'].setValue('');      
    },err=>{

      const json=err.error.errors;
      let errorResponse='';
      for (let i in json) {
        
        errorResponse=json[i].msg;      
      }
      
      Swal.fire('Error',errorResponse,'error');
      
    }    
    )
  }

  updateAjustment(){
    this.modalAdjustmentAccountService.updateAjustment();
  }

}

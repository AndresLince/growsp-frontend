import  Swal  from 'sweetalert2';
import { Account } from './../models/account.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalAdjustmentAccountService {
  actualAccount:string='';

  public adjustmentForm=this.formBuilder.group({ 
    total:[
      '',
      [Validators.required]
    ],   
    adjustment:[
      '0',
      [Validators.required] 
    ],
    value:[
      '0',
      [Validators.required] 
    ],
    date:[
      '',
      [Validators.required] 
    ],
    id_account:[
      '0',
      [Validators.required] 
    ]
  });

  private _ocultarModal:boolean=true;
  public modalTitle:string;
  get ocultarModal(){

    return this._ocultarModal;
  }

  constructor(
    public formBuilder:FormBuilder
  ) { }

  closeModal(){

    this._ocultarModal=true;
  }

  abrirModal(
    account:Account
  ){
    if(this.actualAccount!=account.name){
      this.adjustmentForm.controls['value'].setValue(0);
      this.adjustmentForm.controls['adjustment'].setValue(0);
    }    
    this.actualAccount=account.name;
    this._ocultarModal=false;    
    this.adjustmentForm.controls['total'].setValue(account.total);
    
    this.adjustmentForm.controls['id_account'].setValue(account.id_account);
    this.modalTitle="Ajuste de cuenta "+account.name;
  }

  updateAjustment(){
  
    if(this.adjustmentForm.value.value<0){
      Swal.fire('Error','No puedes tener dinero negativo. Creeme','error');
      this.adjustmentForm.controls['value'].setValue(0);
      return;
    }
    const adjustment=this.adjustmentForm.value.value-this.adjustmentForm.value.total;
    this.adjustmentForm.controls['adjustment'].setValue(adjustment);
  }

    
}

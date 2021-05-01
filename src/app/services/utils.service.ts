import Swal  from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public loading:boolean=false;

  constructor() { }

  showAlertError(err){
    let errorResponse='';
    if(err.error.message){
      errorResponse=err.error.message;
    }else{
      const json=err.error.errors;
      
      for (let i in json) {
        
        errorResponse=json[i].msg;      
      }
    }
    Swal.fire('Error',errorResponse,'error');
  }

  changeLoading(loading:boolean){
    setTimeout(() => {
      this.loading=loading;
    });   
  }

  getLoading(){
    return this.loading;
  }
}

import Swal  from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  showAlertError(err){
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
  }
}

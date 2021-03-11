import  Swal  from 'sweetalert2';
import { AccountService } from './../../services/account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html'
})
export class AccountFormComponent implements OnInit {

  @Input() public id_transaction_category:string;
  @Input() public form_type:string;
  @Input() public budgetDetail:any;
  @Output() refreshView:EventEmitter<boolean>=new EventEmitter();

  public type:string='0';

  public accountForm=this.formBuilder.group({
    name:[
      '',
      [Validators.required]
    ],   
    affect_budget:[
      '1',
      [Validators.required]
    ]
  });

  constructor(
    public formBuilder:FormBuilder,
    public accountService:AccountService
  ) {

   }

  ngOnInit(): void {    
    if(this.form_type=='0'){      

      /*this.accountForm.controls['name'].setValue(this.budgetDetail.description);
      this.accountForm.controls['value'].setValue(this.budgetDetail.value);*/
    }

  }

  sendData(){

    if(this.form_type=='0'){      
     
    }

    if(this.form_type=='1'){

      this.accountService.createAccount(this.accountForm.value).subscribe((res:any)=>{
        Swal.fire(
            'Buen trabajo!',
            res.message,
            'success'
        );
        this.refreshView.emit(true);
      },err=>{
        const json=err.error.errors;
        let errorResponse='';
        for (let i in json) {
          
          errorResponse=json[i].msg;      
        }
        
        Swal.fire('Error',errorResponse,'error');
      });
    }


  }

}

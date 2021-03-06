import { TransactionCategoryService } from './../../services/transaction-category.service';
import  Swal  from 'sweetalert2';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transaction-category-form',
  templateUrl: './transaction-category-form.component.html'
})
export class TransactionCategoryFormComponent implements OnInit {

  @Input() public id_transaction_category:string;
  @Input() public form_type:string;
  @Input() public budgetDetail:any;
  @Output() refreshView:EventEmitter<boolean>=new EventEmitter();

  public type:string='0';

  public transactionCategoryForm=this.formBuilder.group({
    description:[
      '',
      [Validators.required]
    ],   
    type:[
      '1',
      [Validators.required]
    ]
  });

  constructor(
    public formBuilder:FormBuilder,
    public transactionCategoryService:TransactionCategoryService
  ) {

   }

  ngOnInit(): void {
    if(this.form_type=='0'){      

      /*this.transactionCategoryForm.controls['name'].setValue(this.budgetDetail.description);
      this.transactionCategoryForm.controls['value'].setValue(this.budgetDetail.value);*/
    }

  }

  sendData(){

    if(this.form_type=='0'){      
     
    }

    if(this.form_type=='1'){

      this.transactionCategoryService.createTransactionCategory(this.transactionCategoryForm.value).subscribe((res:any)=>{
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

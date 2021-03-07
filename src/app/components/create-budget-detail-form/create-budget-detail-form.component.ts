import  Swal  from 'sweetalert2';
import { BudgetDetailService } from 'src/app/services/budget-detail.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-budget-detail-form',
  templateUrl: './create-budget-detail-form.component.html',
  styles: [
  ]
})
export class CreateBudgetDetailFormComponent implements OnInit {

  @Input() public id_budget:string;
  @Input() public form_type:string;
  @Input() public budgetDetail:any;
  @Output() refreshView:EventEmitter<boolean>=new EventEmitter();

  public type:string='0';

  public budgetDetailForm=this.formBuilder.group({
    name:[
      '',
      [Validators.required]
    ],   
    type:[
      '1',
      [Validators.required]
    ],
    quantity:[
      '',
      [Validators.required]
    ],  
    value:[
      '',
      [Validators.required]
    ],  
  });

  constructor(
    public formBuilder:FormBuilder,
    public budgetDetailService:BudgetDetailService
  ) {

   }

  ngOnInit(): void {
    if(this.form_type=='0'){

      console.log("Entra 0");

      this.budgetDetailForm.controls['name'].setValue(this.budgetDetail.description);
      this.budgetDetailForm.controls['value'].setValue(this.budgetDetail.value);
    }else{
      console.log("Entra 1");
    }

  }

  sendData(){

    if(this.form_type=='0'){      
      this.budgetDetailService.updateBudgetDetail(this.budgetDetail.id,this.budgetDetailForm.value).subscribe((res:any)=>{
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

    if(this.form_type=='1'){

      this.budgetDetailService.createBudgetDetail(this.id_budget,this.budgetDetailForm.value).subscribe((res:any)=>{
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

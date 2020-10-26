import  Swal  from 'sweetalert2';
import { BudgetService } from './../../services/budget.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-budget-form',
  templateUrl: './create-budget-form.component.html',
  styles: [
  ]
})
export class CreateBudgetFormComponent implements OnInit {

  @Output() refreshBudgets:EventEmitter<boolean>=new EventEmitter; 
  name:string='';

  public budgetForm=this.formBuilder.group({ 
    name:[
      '',
      [Validators.required]
    ]
  });

  constructor(
    public formBuilder:FormBuilder,
    public budgetService:BudgetService
    ) { }

  ngOnInit(): void {
  }

  sendData(){    

    this.budgetService.createBudget(this.budgetForm.value).subscribe(resp=>{

      this.refreshBudgets.emit(true);
      this.name='';
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

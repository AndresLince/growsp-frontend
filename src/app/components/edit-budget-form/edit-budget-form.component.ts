import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BudgetService } from './../../services/budget.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-budget-form',
  templateUrl: './edit-budget-form.component.html'  
})
export class EditBudgetFormComponent implements OnInit {  

  @Input() public budgetName:string='';
  @Input() public AffectBudget:string;
  @Input() public id_budget:string;

  public budgetForm=this.formBuilder.group({ 
    name:[
      '',
      [Validators.required]
    ],
    AffectBudget:[
      '',
      [Validators.required]
    ]
  });

  constructor(
    public formBuilder:FormBuilder,
    public budgetService:BudgetService,public router:Router
  ) { }

  ngOnInit(): void {
  }

  sendData(){
    
    this.budgetService.editBudget(this.id_budget,this.budgetForm.value).subscribe(resp=>{
      console.log(resp);
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

  goToCopy(){
    this.router.navigateByUrl('dashboard/budget/copy/'+this.id_budget);
  }

}

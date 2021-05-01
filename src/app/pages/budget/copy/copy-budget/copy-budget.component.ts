import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from './../../../../services/budget.service';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-copy-budget',
  templateUrl: './copy-budget.component.html',
})
export class CopyBudgetComponent implements OnInit {  
  dynamicForm: FormGroup;    
  public id:string;  
  totalValue:number=0;
  pictures = [
    {
      id: 1,
      title: 'A natural view',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg'
    }   
  ];
  constructor(
    public budgetService:BudgetService,
    public route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private utilsService:UtilsService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.dynamicForm = this.formBuilder.group({      
      name:[
        '',
        [Validators.required]
      ],   
      budgetDetails: new FormArray([])     
    });
    this.getBudgetDetails();
  }

  

  getBudgetDetails(){      
      this.budgetService.getBudgetDetails(this.id).subscribe(resp=>{            
      resp.budgetDetails.forEach(element => {       
        
        if(element.type==0){
          this.totalValue-=element.initial_value;
        }else{
          this.totalValue+=element.initial_value;
        }
        
        this.details.push(this.formBuilder.group({
          description: [element.description, Validators.required],
          value: [element.initial_value, [Validators.required]],
          type: [element.type, [Validators.required]]
        }));
      });
      this.dynamicForm.controls['name'].setValue(resp.budgetDetails[0].name);      
      
    });
  
  }
  // convenience getters for easy access to form fields
get f() { return this.dynamicForm.controls; }
get details() { return this.f.budgetDetails as FormArray; }  
 
calculateTotalValue(){
  console.log("entra");
  this.totalValue=0;
  for (let control of this.details.controls) {
    
    if(control['value'].type==0){
      this.totalValue-=control['value'].value;
    }else{
      this.totalValue+=control['value'].value;
    }    
  }
}

  addDetail() {
    this.utilsService.changeLoading(true);    
    this.details.push(this.formBuilder.group({
      description: ['', Validators.required],
      value: ['', [Validators.required]],
      type: [0, [Validators.required]]
    }))    
    setTimeout(()=>{
      window.scrollTo(0,document.body.scrollHeight);
      this.utilsService.changeLoading(false);    
    },1000);
    
  }

  removeDetail(index:number){
    
    this.details.removeAt(index);
    this.calculateTotalValue();
  }   

  onSubmit() { 
    
      if (this.dynamicForm.invalid) {        
          return;
      }

      this.utilsService.changeLoading(true);    
    
      // display form values on success
      this.budgetService.createBudgetCopy(this.dynamicForm.value).subscribe(resp=>{
        this.router.navigateByUrl('dashboard/budgets');
      },
      err=>{
        this.utilsService.showAlertError(err);
        this.utilsService.changeLoading(false);        
      },()=>{
        this.utilsService.changeLoading(false);
      })
  }

  compareCategoryObjects(object1: any, object2: any) {    
    return object1 == object2;
  }
  


}

import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from './../../services/budget.service';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styles: [
  ]
})
export class BudgetComponent implements OnInit {
  faEdit = faEdit;

  constructor(public budgetService:BudgetService,public route:ActivatedRoute,   public router:Router) { }
  public id:string;
  public budgetDetails:[{id:0}];
  public budgetName:string='';
  public AffectBudget:string='0';

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getBudgetDetails();
  }

  getBudgetDetails(){
    this.budgetService.getBudgetDetails(this.id).subscribe(resp=>{

      this.budgetDetails = resp.budgetDetails;
      this.budgetName = resp.budgetDetails[0].name;
      this.AffectBudget= resp.budgetDetails[0].AffectBudget.toString()
    });
  }

  openBudgetDetail(id:number){    

    this.router.navigateByUrl('dashboard/budgetDetail/edit/'+id);
  }

}

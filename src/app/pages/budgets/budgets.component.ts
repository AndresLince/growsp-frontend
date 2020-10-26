import { Router } from '@angular/router';
import { BudgetService } from './../../services/budget.service';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styles: [
  ]
})
export class BudgetsComponent implements OnInit {

  public budgets:any=[];
  faEdit = faEdit;

  constructor(
    public budgetService:BudgetService,
    public router:Router
  ) { }

  ngOnInit(): void {

    this.getBudgets();    
  }

  getBudgets(){

    this.budgetService.getBudgetsTotals().subscribe(resp=>{
      this.budgets=resp.budgets;
    })
  }

  openBudget(id:number){

    this.router.navigateByUrl('dashboard/budget/edit/'+id);
  }

  openBudgetDetail(id:number){    

    this.router.navigateByUrl('dashboard/budgetDetail/edit/'+id);
  }

  

}

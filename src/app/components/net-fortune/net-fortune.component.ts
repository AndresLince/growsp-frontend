import { BudgetService } from './../../services/budget.service';
import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-net-fortune',
  templateUrl: './net-fortune.component.html',
  styles: [
  ]
})
export class NetFortuneComponent implements OnInit {

  public accounts:Account[];
  public totalIncomes:number=0;
  public totalExpenses:number=0;
  public totals:number=0;

  constructor(
    private accountService:AccountService,
    private budgetService:BudgetService
  ) { }

  ngOnInit(): void {

    this.accountService.getAccountsTotals().subscribe(resp=>{

      this.accounts = resp.accounts;   

      resp.accounts.map((account) => {   
        
        this.totalIncomes+=account.total;                     
        //if(budget.type===1){

          
        /*}else{

          this.totalExpenses+=budget.total;
        }*/

        
      });  
      console.log(this.totalIncomes);  

      this.budgetService.getBudgetsTotals().subscribe(resp=>{
        
        resp.budgets.map((budget) => {   
          console.log(resp);
          if(budget.AffectBudget){

            this.totalExpenses+=budget.expenses-budget.incomes;  
          }
        });  
        console.log(this.totalExpenses);  

        this.totals=this.totalIncomes-this.totalExpenses;
      });
    })
  }

}

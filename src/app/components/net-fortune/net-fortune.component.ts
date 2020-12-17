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
      });

      this.budgetService.getBudgetsTotals().subscribe(resp=>{

        resp.budgets.map((budget) => {

          if(budget.AffectBudget){
            console.log(budget);
            this.totalIncomes+=budget.incomes;

            this.totalExpenses+=budget.expenses;
          }
        });

        this.totals=this.totalIncomes-this.totalExpenses;
      });
    })
  }

}

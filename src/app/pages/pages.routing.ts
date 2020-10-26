import { BudgetsComponent } from './budgets/budgets.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './../guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TransactionsComponent } from './transactions/transactions.component';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';
import { BudgetComponent } from './budget/budget.component';

const routes: Routes = [ 
    {
        path:'dashboard',component:PagesComponent,
        canActivate:[AuthGuard],
        children:[
          {path:'',component:DashboardComponent,data:{title:'Dashboard'}},  
          {path:'transactions',component:TransactionsComponent,data:{title:'Transactions'}},
          {path:'budgets',component:BudgetsComponent,data:{title:'Budgets'}},
          {path:'budgetDetail/edit/:id',component:BudgetDetailComponent,data:{title:'Budgets'}},
          {path:'budget/edit/:id',component:BudgetComponent,data:{title:'Budgets'}}
        ]
    },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

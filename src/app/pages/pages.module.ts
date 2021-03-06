import { TransactionCategoryFormComponent } from './../components/transaction-category-form/transaction-category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './../components/components.module';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';
import { BudgetComponent } from './budget/budget.component';
import { TransactionCategoriesComponent } from './transaction-categories/transaction-categories.component';
import {MatListModule} from '@angular/material/list'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 


@NgModule({
  declarations: [DashboardComponent, PagesComponent, TransactionsComponent, BudgetsComponent, BudgetDetailComponent, BudgetComponent, TransactionCategoriesComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatIconModule
  ],
  exports:[
    DashboardComponent,
    PagesComponent,
    TransactionsComponent,
    FontAwesomeModule,
   
  ]
})
export class PagesModule { }

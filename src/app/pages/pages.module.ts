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
import { AccountsComponent } from './accounts/accounts.component'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CopyBudgetComponent } from './budget/copy/copy-budget/copy-budget.component'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button'; 
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [DashboardComponent, PagesComponent, TransactionsComponent, BudgetsComponent, BudgetDetailComponent, BudgetComponent, TransactionCategoriesComponent, AccountsComponent, CopyBudgetComponent],
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
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSidenavModule
  ],
  exports:[
    DashboardComponent,
    PagesComponent,
    TransactionsComponent,
    FontAwesomeModule,
   
  ]
})
export class PagesModule { }

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalTransactionComponent } from './modal-transaction/modal-transaction.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { CreateBudgetFormComponent } from './create-budget-form/create-budget-form.component';
import { EditBudgetFormComponent } from './edit-budget-form/edit-budget-form.component';
import { CreateBudgetDetailFormComponent } from './create-budget-detail-form/create-budget-detail-form.component';
import { ModalAdjustmentAccountComponent } from './modal-adjustment-account/modal-adjustment-account.component';
import { NetFortuneComponent } from './net-fortune/net-fortune.component';
import { MatListModule } from '@angular/material/list';
import { TransactionCategoryFormComponent } from './transaction-category-form/transaction-category-form.component';
import { AccountFormComponent } from './account-form/account-form.component'; 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatCardModule} from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ModalTransactionComponent, TransactionsTableComponent, PaginatorComponent, CreateBudgetFormComponent, EditBudgetFormComponent, CreateBudgetDetailFormComponent, ModalAdjustmentAccountComponent, NetFortuneComponent, TransactionCategoryFormComponent, AccountFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FlexLayoutModule
  ],
  exports:[
    ModalTransactionComponent,
    TransactionsTableComponent,
    FontAwesomeModule,    
    PaginatorComponent,
    CreateBudgetFormComponent,
    EditBudgetFormComponent,
    CreateBudgetDetailFormComponent,
    ModalAdjustmentAccountComponent,
    NetFortuneComponent,
    TransactionCategoryFormComponent,
    AccountFormComponent
  ]
})
export class ComponentsModule { }

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

@NgModule({
  declarations: [ModalTransactionComponent, TransactionsTableComponent, PaginatorComponent, CreateBudgetFormComponent, EditBudgetFormComponent, CreateBudgetDetailFormComponent, ModalAdjustmentAccountComponent, NetFortuneComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
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
    NetFortuneComponent
  ]
})
export class ComponentsModule { }

import { TransactionCategory } from './../../models/transactionCategory.model';
import { TransactionCategoryService } from './../../services/transaction-category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-categories',
  templateUrl: './transaction-categories.component.html'
})
export class TransactionCategoriesComponent implements OnInit {

  public transactionCategories:TransactionCategory[];

  constructor( public transactionCategoryService:TransactionCategoryService,) { }

  ngOnInit(): void {
    this.transactionCategoryService.getAllTransactionCategories().subscribe(
      resp=>{        
        this.transactionCategories=resp.transactionCategories;
      }
    )
  }

}

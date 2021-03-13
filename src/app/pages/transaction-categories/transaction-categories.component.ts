import { UtilsService } from './../../services/utils.service';
import { TransactionCategory } from './../../models/transactionCategory.model';
import { TransactionCategoryService } from './../../services/transaction-category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-categories',
  templateUrl: './transaction-categories.component.html'
})
export class TransactionCategoriesComponent implements OnInit {  
  public total:number=0;
  public totalTemp:number=0;  
  public desde:number=0;  
  public transactionCategoriesTemp:Account[];
  public transactionCategories:TransactionCategory[];
  public filter:string='no-filter';

  constructor( public transactionCategoryService:TransactionCategoryService,public utilsService:UtilsService) { }

  ngOnInit(): void {
    this.getTransactionCategories(this.desde,this.filter,false);
  }

  getTransactionCategories(desde:number=0,filter:string='no-filter',search:boolean=false){
    this.transactionCategoryService.getTransactionCategories(desde,filter,0,2).subscribe(
      resp=>{     
        if(!search){

          this.transactionCategoriesTemp=resp.transactionCategories;
          this.total=resp.total;
        }
        console.log(resp);   
        this.transactionCategories=resp.transactionCategories;
      },err=>{
        this.utilsService.showAlertError(err);
      }
    )
  }

  changePage(valor:number){

    this.desde=valor;
    console.log(valor);
    this.getTransactionCategories(this.desde,this.filter,true);
  }

  search(termino:string){
    this.filter=termino;
    if(termino.length===0){
      this.filter='no-filter';
    }
    this.desde=0;
    this.getTransactionCategories(this.desde,this.filter,true);
  }

}

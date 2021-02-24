import { Transaction } from './../models/transaction.model';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url=environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BudgetDetailService {

  constructor(public http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token')||'';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }
  
  getBudgetDetails(name:string){

    return this.http.get<any>(`${base_url}/budgetDetail/${name}`,this.headers).pipe(
      map(resp=>{      
        
        return {budgetDetails:resp.budgetDetails};
      })
    )
  }

  getBudgetDetail(id:string){

    return this.http.get<any>(`${base_url}/budgetDetail/detail/${id}`,this.headers).pipe(
      map(resp=>{      
        
        return {budgetDetail:resp.budgetDetail};
      })
    )
  }
  getBudgetDetailTransactions(id:string,desde:number,filter:string){

    return this.http.get<any>(`${base_url}/budgetDetail/detail/transactions/${id}/${desde}/5/${filter}`,this.headers).pipe(
      map(resp=>{    
        
        const budgetDetailTransactions=resp.budgetDetailTransactions.map(
          transaction=>new Transaction(
            transaction.id_transaction,
            transaction.description,            
            transaction.value,
            transaction.quantity,
            transaction.id_account,
            transaction.account_name,
            transaction.budget_detail_name,
            transaction.type,          
            transaction.category_name,
            transaction.date,
            transaction.id_transaction_category,
            transaction.budget_name          
          )
        )
        
        return {budgetDetailTransactions:budgetDetailTransactions,total:resp.total};
      })
    )
  }
  createTransaction(data:any){

    return this.http.post(`${base_url}/budgetDetail/transaction/`,data,this.headers)
  }

  createBudgetDetail(id_budget:string,data:any){
    console.log(id_budget);
    return this.http.post(`${base_url}/budgetDetail/create/${id_budget}`,data,this.headers)
  }

  updateBudgetDetail(id_budget_detail:string,data:any){
    console.log(id_budget_detail);
    return this.http.patch(`${base_url}/budgetDetail/${id_budget_detail}`,data,this.headers)
  }
}

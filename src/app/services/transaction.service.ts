import { GetTransactions } from './../interfaces/get-transactions.interface';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http:HttpClient
  ) { }

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

  getTransactions(desde:number=0,filter:string='no-filter',withoutBudget:number){
    
    return this.http.get<GetTransactions>(`${base_url}/transaction/${desde}/${filter}/${withoutBudget}`,this.headers).pipe(
      map(resp=>{
        
        const transactions=resp.transactions.map(
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
        return {total:resp.total,transactions};
      })
    )
  }

  createTransaction(data:any){

    return this.http.post(`${base_url}/transaction/`,data,this.headers)
  }

  editTransaction(id_transaction,data:any){

    return this.http.put(`${base_url}/transaction/${id_transaction}`,data,this.headers)
  }

  
}

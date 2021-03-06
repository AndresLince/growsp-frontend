import { TransactionCategory } from './../models/transactionCategory.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


const base_url=environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class TransactionCategoryService {

  public categories=[{id:1,name:'Categoria 1'},{id:2,name:'Categoria 2'},{id:3,name:'Categoria 3'}];

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

  getTransactionCategories(type:number){

    return this.http.get<any>(`${base_url}/transactionCategory`,this.headers).pipe(
      map(resp=>{      
        
        const transactionCategories=resp.transactionCategories.filter(transactionCategory=>transactionCategory.type===type);
        
        return {transactionCategories:transactionCategories};
      }
        
      )
    )
  }
  getAllTransactionCategories(){

    return this.http.get<any>(`${base_url}/transactionCategory`,this.headers).pipe(
      map(resp=>{
        
        const transactionCategories=resp.transactionCategories.map(
          transactionCategory=>new TransactionCategory(
            transactionCategory.id,
            transactionCategory.name,            
            transactionCategory.type        
          )
        )
        return {transactionCategories};
      })
    );
  }

  createTransactionCategory(data:any){
    return this.http.post(`${base_url}/transactionCategory/`,data,this.headers)
  }
}

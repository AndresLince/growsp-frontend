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

  getTransactionCategories(desde:number=0,filter:string='no-filter',all:number,type:number){    

    return this.http.get<any>(`${base_url}/transactionCategory/${desde}/${filter}/${all}`,this.headers).pipe(
      map(resp=>{   
        var transactionCategories=resp.transactionCategories.map(
          transactionCategory=>new TransactionCategory(
            transactionCategory.id,
            transactionCategory.name,            
            transactionCategory.type        
          )
        )    
        if(type!=2){          
          var transactionCategories=resp.transactionCategories.filter(transactionCategory=>transactionCategory.type===type);          
        }      
        return {transactionCategories:transactionCategories,total:resp.total};
      }
        
      )
    )
  } 

  createTransactionCategory(data:any){
    return this.http.post(`${base_url}/transactionCategory/`,data,this.headers)
  }
}

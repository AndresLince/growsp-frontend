import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';


const base_url=environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BudgetService {

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

  getBudgets(){

    return this.http.get<any>(`${base_url}/budget`,this.headers).pipe(
      map(resp=>{      
        
        return {budgets:resp.budgets};
      })
    )
  }  

  getBudgetsTotals(){

    return this.http.get<any>(`${base_url}/budget/totals`,this.headers).pipe(
      map(resp=>{      
        
        return {budgets:resp.budgets};
      })
    )
  } 

  createBudget(data:any){

    return this.http.post(`${base_url}/budget`,data,this.headers);
  }

  getBudgetDetails(id:string){

    return this.http.get<any>(`${base_url}/budgetDetails/${id}`,this.headers).pipe(
      map(resp=>{      
        
        return {budgetDetails:resp.budgetDetails};
      })
    )
  } 

  editBudget(id_budget:string,data:any){

    return this.http.put(`${base_url}/budget/${id_budget}`,data,this.headers);
  }
}






import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';


const base_url=environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AccountService {

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

  getAccount(){

    return this.http.get<any>(`${base_url}/account`,this.headers).pipe(
      map(resp=>{      
        
        return {accounts:resp.accounts};
      })
    )
  }

  getAccountsTotals(){

    return this.http.get<any>(`${base_url}/account/totals`,this.headers).pipe(
      map(resp=>{      
        
        return {accounts:resp.accounts};
      })
    )
  }

  createAdjustment(data:any){

    return this.http.post(`${base_url}/account/adjustment/`,data,this.headers)
  }

  createAccount(data:any){

    return this.http.post(`${base_url}/account/`,data,this.headers)
  }



  
}






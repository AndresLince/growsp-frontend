import { SignUp } from '../interfaces/signup.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap, map,catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    private router:Router
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

  cerrarSesion(){

    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');

  }

  login(formData:LoginForm){

    return this.http.post(`${base_url}/login`,formData).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      })
    )
  }


  validarToken():Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`,this.headers).pipe(
      map((resp:any)=>{

        localStorage.setItem('token',resp.token);

        return true;
      }),
      catchError(error =>
        of(false)
      )
    )
  }

  signUp(formData:SignUp){
    return this.http.post(`${base_url}/login/signup`,formData).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      })
    )
  }

  activate(activateData:any){

    return this.http.put(`${base_url}/login/`,activateData);
  }
}

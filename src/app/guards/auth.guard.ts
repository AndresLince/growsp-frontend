import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService:UserService,
    private router:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ){
      console.log("paso por el canActivate del guard");
      return this.userService.validarToken()
      .pipe(
        tap(estaAutenticado=>{
          if(!estaAutenticado){
            this.router.navigateByUrl('/login');
          }
        })
      )
  }

}

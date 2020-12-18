import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public loginForm=this.fb.group({
    email:[
      '',
      [Validators.required,Validators.email]
    ],
    password:[
      '',
      Validators.required
    ],
    remember:[
      false
    ]
  });

  constructor(
    private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  login(){

    this.usuarioService.login(this.loginForm.value).subscribe(
      resp=>{

        this.router.navigateByUrl('/');
      },
      (error)=>{

        Swal.fire(
          'GrowSp',
          'Error al ingresar al sistema por favor intenta mas tarde!',
          'error'
        )
      }
    )
  }

}

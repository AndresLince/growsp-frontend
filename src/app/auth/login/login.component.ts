import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

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
  public email:string;
  public key:string;

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get("email");
    this.key = this.route.snapshot.paramMap.get("key");

    if (this.email != null && this.key != null) {
      this.activate({"email":this.email,"verification_code":this.key});
    }
  }

  login(){
    this.userService.login(this.loginForm.value).subscribe(
      resp=>{

        this.router.navigateByUrl('/');
      },
      (error)=>{

        let errorResponse='';
        if(error.error.msg){
          errorResponse=error.error.msg;
        }else{
          const json=error.error.errors;

          for (let i in json) {

            errorResponse=json[i].msg;
          }
        }
        if(errorResponse==''){
          errorResponse="Error de conexión por favor verifica tu conexión a internet."
        }

        Swal.fire('Error',errorResponse,'error');
      }
    )
  }

  activate(activateData:any){
    this.userService.activate(activateData).subscribe(
      (resp:any)=>{

        Swal.fire('GrowSp',resp.msg,'success');
        this.loginForm.controls['email'].setValue(this.email);
      },
      (error)=>{

        let errorResponse='';
        if(error.error.msg){
          errorResponse=error.error.msg;
        }else{
          const json=error.error.errors;

          for (let i in json) {

            errorResponse=json[i].msg;
          }
        }

        Swal.fire('Error',errorResponse,'error');
      }
    )
  }
}

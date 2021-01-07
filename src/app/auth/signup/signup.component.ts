import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit {

  public signupForm=this.formBuilder.group({
    username:[
      '',
      Validators.required
    ],
    email:[
      '',
      [Validators.required,Validators.email]
    ],
    password:[
      '',
      Validators.required
    ],
    confirm_password:[
      '',
      Validators.required
    ]
  });

  faEye = faEye;

  constructor(private formBuilder:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  signup(){

    this.userService.signUp(this.signupForm.value).subscribe((resp)=>{
      Swal.fire('GrowSp',resp.msg,'success');
      this.router.navigateByUrl('/');
    },(error)=>{

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
      })

  }

}

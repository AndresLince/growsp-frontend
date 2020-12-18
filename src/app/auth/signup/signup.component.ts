import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit {

  public signupForm=this.formBuilder.group({
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

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  signup(){

    console.log("Intenta");
  }

}

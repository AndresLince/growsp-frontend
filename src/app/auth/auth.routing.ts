import { SignupComponent } from './signup/signup.component';

import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'signUp',component:SignupComponent},
    {path:'user/activate/:email/:key',component:LoginComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}

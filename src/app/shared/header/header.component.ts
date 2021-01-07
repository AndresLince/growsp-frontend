
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  cerrarSesion(){

    this.userService.cerrarSesion();
  }


}

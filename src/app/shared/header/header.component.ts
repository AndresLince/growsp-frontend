import { MenuOptionsService } from './../../services/menu-options.service';

import { UserService } from '../../services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private userService:UserService,private menuOptionsService:MenuOptionsService) { }
  menuOptions:any=[];

  ngOnInit(): void {
    this.menuOptions=this.menuOptionsService.menuOptions;
  }

  cerrarSesion(){

    this.userService.cerrarSesion();
  }
  public onToggleSidenav = () => { 
    
    this.sidenavToggle.emit();
  }

}

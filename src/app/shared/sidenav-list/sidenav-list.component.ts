import { UserService } from './../../services/user.service';
import { MenuOptionsService } from './../../services/menu-options.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  constructor(private menuOptionsService:MenuOptionsService,private userService:UserService) { }
  menuOptions:any=[];

  @Output() sidenavClose = new EventEmitter();  
  ngOnInit() {
    this.menuOptions=this.menuOptionsService.menuOptions;
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  cerrarSesion(){

    this.userService.cerrarSesion();
  }

}

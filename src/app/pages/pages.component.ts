import { UtilsService } from './../services/utils.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
 

  constructor(public utilsService:UtilsService) { }

  ngOnInit(): void {
  }


}

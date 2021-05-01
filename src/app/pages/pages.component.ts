import { UtilsService } from './../services/utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(public utilsService:UtilsService) { }

  ngOnInit(): void {
  }

}

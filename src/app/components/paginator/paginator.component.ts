import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styles: [
  ]
})
export class PaginatorComponent implements OnInit,OnChanges {

  @Input() desde:number=0;
  @Input() total:number=0;
  @Output() newPage:EventEmitter<number>= new EventEmitter;
  @Input() itemsPerPage:number=0;
  pageNumbers:number[]=[];
  limitOfPages:number=3;
  currentPage:number=1;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    
    let paginasTotales=Math.ceil(this.total / this.itemsPerPage);

    if(this.currentPage+this.limitOfPages<paginasTotales){

      paginasTotales = this.currentPage+this.limitOfPages;
    }

    

    this.pageNumbers=[];    
    console.log(this.currentPage);

    let numeroInicial=this.currentPage-this.limitOfPages;
    if(numeroInicial<1){
      
      numeroInicial=1;
    }
    console.log(numeroInicial);

    for (let i = numeroInicial; i <= paginasTotales; i++) {
      this.pageNumbers.push(i);
    }

    
    console.log(this.pageNumbers);
  }

  changePage(valor:number){
    
    this.desde+=valor;  
    console.log(this.desde);
    if(this.desde<0){

      this.desde=0;
    }else if(this.desde>this.total){
      
      this.desde-=valor;
    }else{
      
      if(valor<0){
     
        this.currentPage--;
        console.log("Resto",this.currentPage);
      }else{
        this.currentPage++;
        console.log("Sumo",this.currentPage);
      }
    }        
    
    this.newPage.emit(this.desde);
  }

  selectPage(page:number){
    
    this.desde=this.itemsPerPage*page-this.itemsPerPage;  
    this.currentPage=page;
    
    this.newPage.emit(this.desde);
  }


}

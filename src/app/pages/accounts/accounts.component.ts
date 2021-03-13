import { AccountService } from './../../services/account.service';
import { Account } from './../../models/account.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {

  public totalAccounts:number=0;
  public totalAccountsTemp:number=0;  
  public desde:number=0;  
  public accountsTemp:Account[];
  public accounts:Account[];
  public filter:string='no-filter';

  constructor(
    public accountService:AccountService
  ) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(desde:number=0,filter:string='no-filter',search:boolean=false){
    this.accountService.getAccount(desde,filter).subscribe(
      resp=>{        
        if(!search){

          this.accountsTemp=resp.accounts;
          this.totalAccountsTemp=resp.total;
        }
        this.accounts=resp.accounts;
        this.totalAccounts=resp.total;
      }
    )
  }

  changePage(valor:number){

    this.desde=valor;
    console.log(valor);
    this.getAccounts(this.desde,this.filter,true);
  }

  search(termino:string){
    this.filter=termino;
    if(termino.length===0){
      this.filter='no-filter';
    }
    this.desde=0;
    this.getAccounts(this.desde,this.filter,true);
  }

}

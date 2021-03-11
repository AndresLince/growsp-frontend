import { AccountService } from './../../services/account.service';
import { Account } from './../../models/account.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {

  public accounts:Account[];

  constructor(
    public accountService:AccountService
  ) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(){
    this.accountService.getAccount().subscribe(
      resp=>{        
        this.accounts=resp.accounts;
      }
    )
  }

}

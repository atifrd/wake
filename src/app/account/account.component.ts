import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { UserProfile } from '../_models/user.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})

export class AccountComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private accountService: AccountService
    ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  signOut() {
    this.accountService.logout();
    this.router.navigate(['home']);
  }
}
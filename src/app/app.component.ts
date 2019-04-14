import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './_services/account.service';
import { AuthenticatedUser, UserSession } from './_models/user.models';
import { Observable, Subscription } from 'rxjs';
import * as $ from 'jquery';
import 'foundation-sites';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'Feed Tools';

  unauthenticated: boolean;
  session: UserSession;
  sessionSubscription: Subscription;

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.sessionSubscription = this.accountService.session.subscribe(user => {
      this.session = user;
      this.unauthenticated = this.session == null;
    });
    $(document).ready(() => {
      $(document).foundation();
    })
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }
}
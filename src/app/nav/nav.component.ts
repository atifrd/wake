import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FarmService } from '../_services/farm.service';
import { AccountService } from '../_services/account.service';
import { UserRole } from '../_models/user.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})


export class NavComponent implements OnInit, OnDestroy {

  // we're subscribing to the session to watch it change
  sessionSubscription: Subscription;
  isAuthenticated: boolean = false;
  title: string = "Dairy Feed Tools";
  
  constructor(
    private router: Router,
    public farm: FarmService,
    public account: AccountService
  ) 
  {
    this.isAuthenticated = this.account.sessionValue ? this.account.sessionValue.accessToken !== null : false;
  }

  ngOnInit() {
    this.sessionSubscription = this.account.session.subscribe(user => {
      this.isAuthenticated = user !== null;
    });
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }

  updateFullscreenStatus() {

  }

  updateFarmSelected(farmId: string) {

  }

  isAuthorisedForRole(role: string) : boolean {
    let roleForFarm = new UserRole();
    roleForFarm.farmId = this.account.sessionValue.farm.id;
    roleForFarm.role = role;
    return this.account.hasRole(roleForFarm);
  }

  signOut(){
    this.account.logout();
    this.router.navigate(['home']);
  }
}
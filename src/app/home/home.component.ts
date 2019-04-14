import { Component, OnInit, OnDestroy } from '@angular/core';
import { Farm } from '../_models/farm.models';
import { UserSession, UserRole } from '../_models/user.models';
import { FarmService } from '../_services/farm.service';
import { AccountService } from '../_services/account.service';
import { FeedplanService } from '../_services/feedplan.service';
import { InventoryService } from '../_services/inventory.service';
import { Subscription } from 'rxjs';
import { Feedplan } from '../_models/feedplan.models';
import { StorageFacility } from '../_models/inventory.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  sessionSubscription: Subscription;
  feedplanSubscription: Subscription;
  storageSubscription: Subscription;

  loadingFarm: boolean = true;
  loadingFeedplan: boolean = true;
  loadingInventory: boolean = true;

  hasFeedplan: boolean = false;
  hasInventory: boolean = false;
  isAuthenticated: boolean = false;

  feedInventoryStocktakeWarnings: number = 0;
  feedInventoryRunOutWarnings: number = 0;

  constructor(
    public farm: FarmService,
    public account: AccountService,
    public feedplan: FeedplanService,
    public inventory: InventoryService
  ) { 

    this.sessionSubscription = this.account.session.subscribe(user => {
      this.isAuthenticated = user !== null;
    });
  }

  // bootstrap the component
  ngOnInit() {
    this.feedplanSubscription = this.feedplan.feedplan.subscribe(feedplan => {
      //this.feedplan = feedplan;
      this.hasFeedplan = feedplan !== null;
      this.loadingFeedplan = false;
    });

    // if (this.farm.farmValue) {
    //   this.feedplan.loadFeedplan(this.farm.farmValue.farmId);
    // }

    this.storageSubscription = this.inventory.storageFacilities.subscribe(storage => {
      //this.storage = storage;
      this.hasInventory = storage.length > 0;
      this.loadingInventory = false;
      storage.forEach(facility => {
        this.feedInventoryRunOutWarnings += facility.metrics.runoutWarning ? 1 : 0;
        this.feedInventoryStocktakeWarnings += facility.metrics.nextStocktakeWarning ? 1 : 0;
      });
    });
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
    this.feedplanSubscription.unsubscribe();
    this.storageSubscription.unsubscribe();
  }

  // pop modal to select farm
  chooseFarm() {

  }

  isAuthorisedForRole(role: string) {
    let roleForFarm = new UserRole();
    roleForFarm.farmId = this.farm.farmValue.id;
    roleForFarm.role = role;
    return this.account.hasRole(roleForFarm)
  }
}
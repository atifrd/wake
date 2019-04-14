import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { InventoryService } from '../_services/inventory.service';
import { ActivatedRoute, RouterState, Router } from '@angular/router';
import { StorageFacility, StorageType, FeedTypesQuantifiedValues, Task } from '../_models/inventory.models';
import { FarmService } from '../_services/farm.service';
import { RouterScroller } from '@angular/router/src/router_scroller';
import { Subscription } from 'rxjs';
import { UserSession, UserRole } from '../_models/user.models';
import { AlertService } from '../_services/alert.service';
import { Farm } from '../_models/farm.models';
import { LookupService } from '../_services/lookup.service';
import * as _ from 'lodash';
import { ModalService } from '../_services/modal.service';


@Component({
  selector: 'app-inventory-manager',
  templateUrl: './inventory-manager.component.html',
  styleUrls: ['./inventory-manager.component.scss']
})

export class InventoryManagerComponent implements OnInit, OnDestroy {
  hasStorageFacilities: boolean = false;
  storageFacilitiesSubscription: Subscription;
  storageFacility: StorageFacility
  storageTypeId: string = null;
  storageTypeSelected: StorageType;
  feedTypesQuanitifiedValues: FeedTypesQuantifiedValues[] = new Array<FeedTypesQuantifiedValues>();
  task: Task = new Task();
  farmSubscription: Subscription;

  constructor(
    public inventory: InventoryService,
    public account: AccountService,
    public farm: FarmService,
    private modalService: ModalService,
    private alert: AlertService,
    private lookup: LookupService,
    private router: Router
  ) {
    this.feedTypesQuanitifiedValues.push({label: "Dry Matter", value: "dm"});
    this.feedTypesQuanitifiedValues.push({label: "As Fed", value: "as fed"});
  }

  ngOnInit() {
    this.farmSubscription = this.farm.farm.subscribe(farm => {
      this.task.farmId = farm.id;
    });

    this.storageFacilitiesSubscription = this.inventory.storageFacilities.subscribe(storageFacilities => {
      this.hasStorageFacilities = storageFacilities.length > 0;
    });
  }

  ngOnDestroy() {
    this.storageFacilitiesSubscription.unsubscribe();
  }

  isAuthorisedForRole(role: string) {
    let userRole = new UserRole();
    userRole.role = role;
    userRole.farmId = this.farm.farmValue.id;
    return this.account.hasRole(userRole);
  }

  isAuthorisedOnlyForRole(role: string) {
    let userRole = new UserRole();
    userRole.role = role;
    userRole.farmId = this.farm.farmValue.id;
    return this.account.hasOnlyRole(userRole);
  }

  openModal(template: TemplateRef<any>) {
    this.task.step = 'setDetails';
    this.modalService.show(template);
  }

  recordDelivery(storageFacilityId: string) {
    // TODO
  }

  manageStorageDetails(storageFacilityId: string) {
    this.router.navigate(["farms", this.farm.farmValue.id, "storage", storageFacilityId]);
  }

  addStorageFacility() {
    // TODO
    this.alert.error("Not Implemented!");
  }

  save() {

  }
}
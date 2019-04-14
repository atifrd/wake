import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { StorageType, Task } from '../_models/inventory.models';
import { AccountService } from '../_services/account.service';
import { LookupService } from '../_services/lookup.service';
import { InventoryService } from '../_services/inventory.service';
import { FarmService } from '../_services/farm.service';

@Component({
  selector: 'app-add-storage-facility',
  templateUrl: './add-storage-facility.component.html',
  styleUrls: ['./add-storage-facility.component.sass']
})

export class AddStorageFacilityComponent implements OnInit, OnDestroy {

  farmId: string = null;
  storageTypes: Array<StorageType>;
  selectedStorageType: StorageType = null;
  storageTypeId: string = null;
  storageFacilityTypeSelected: boolean = false;

  constructor(
    private accountService: AccountService,
    private farmService: FarmService,
    private lookupService: LookupService,
    private inventoryService: InventoryService
  ) {

    // if (this.task)
    //   this.task = new Task();

    //this.farmId = this.farmService.currentFarm.id;
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
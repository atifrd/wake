import { Component, OnInit, OnDestroy} from '@angular/core';
import { InventoryService } from '../_services/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { StorageFacility, Stocktake } from '../_models/inventory.models';
import { FarmService } from '../_services/farm.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-storage-stocktake-history',
  templateUrl: './storage-stocktake-history.component.html',
  styleUrls: ['./storage-stocktake-history.component.sass']
})

export class StorageStocktakeHistoryComponent implements OnInit, OnDestroy {

  constructor(
    public inventory: InventoryService,
    public farm: FarmService,
    private modalService : ModalService
  ) 
  {
  }

  ngOnInit() {
    this.inventory.getStorageFacilityStocktakes(
      this.farm.farmValue.id, 
      this.inventory.storageFacilityValue.id
    )
  }

  ngOnDestroy(){}

  close() {
    this.modalService.hide();
  }
  
}
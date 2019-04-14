import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { InventoryService } from '../_services/inventory.service';
import { FarmService } from '../_services/farm.service';

@Component({
  selector: 'app-storage-delivery-history',
  templateUrl: './storage-delivery-history.component.html',
  styleUrls: ['./storage-delivery-history.component.sass']
})
export class StorageDeliveryHistoryComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(
    public inventory: InventoryService,
    public farm: FarmService
  ) 
  {
  }

  ngOnInit() {
    this.inventory.getStorageFacilityDeliveries(
      this.farm.farmValue.id, 
      this.inventory.storageFacilityValue.id
    )
  }

  ngOnDestroy(){}

  close() {
    this.closeModal.emit(true);
  }
}

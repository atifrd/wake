import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InventoryService } from '../_services/inventory.service';
import { FarmService } from '../_services/farm.service';

@Component({
  selector: 'app-storage-facility-delete',
  templateUrl: './storage-facility-delete.component.html',
  styleUrls: ['./storage-facility-delete.component.sass']
})
export class StorageFacilityDeleteComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(
    public inventory: InventoryService,
    public farm: FarmService
  ) 
  {
  }

  ngOnInit() {

  }

  save() {
    // this.inventory.updateStorageFacilityName(this.farm.farmValue.farmId, this.inventory.storageFacilityValue.id, this.inventory.storageFacilityValue);
  }

  close() {
    this.closeModal.emit(true);
  }
}

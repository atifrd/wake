import { Component, OnInit} from '@angular/core';
import { InventoryService } from '../_services/inventory.service';
import { FarmService } from '../_services/farm.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-storage-edit-feedrate',
  templateUrl: './storage-edit-feedrate.component.html',
  styleUrls: ['./storage-edit-feedrate.component.sass']
})
export class StorageEditFeedrateComponent implements OnInit {


  constructor(
    private modalService : ModalService,
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
  
  cancel() {
    this.modalService.hide();
  }
}

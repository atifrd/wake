import { Component, OnInit} from '@angular/core';
import { InventoryService } from '../_services/inventory.service';
import { FarmService } from '../_services/farm.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-storage-edit-name',
  templateUrl: './storage-edit-name.component.html',
  styleUrls: ['./storage-edit-name.component.sass']
})

export class StorageEditNameComponent implements OnInit {


  constructor(
    public inventory: InventoryService,
    public farm: FarmService,
    private modelService : ModalService
  ) 
  {
  }

  ngOnInit() {

  }

  save() {
    this.inventory.updateStorageFacilityName(this.farm.farmValue.id, this.inventory.storageFacilityValue.id, this.inventory.storageFacilityValue);
  }

  cancel() {
    this.modelService.hide();
  }
}
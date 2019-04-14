import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-foundation';
import { InventoryService } from '../_services/inventory.service';
import { FarmService } from '../_services/farm.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  storageFacilityId: string;

  modalRef: BsModalRef;

  constructor(
    public inventory: InventoryService,
    private modal: BsModalService,
    private farm: FarmService,
    private router: Router,
    private route: ActivatedRoute
  ) 
  {
    this.route.params.subscribe(parameters => {
      this.storageFacilityId = parameters.storagefacilityid;
    });
  }

  ngOnInit() {
    this.inventory.getStorageFacility(this.farm.farmValue.id, this.storageFacilityId);
  }

  ngOnDestroy() {
  }

  close() {
    this.router.navigate(["farms", this.farm.farmValue.id, "inventory"]);
  }

}
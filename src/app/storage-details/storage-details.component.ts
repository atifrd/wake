import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { InventoryService } from '../_services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FarmService } from '../_services/farm.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: '[app-storage-details].storage-setup-content-row',
  templateUrl: './storage-details.component.html',
  styleUrls: ['./storage-details.component.scss']
})

export class StorageDetailsComponent implements OnInit, OnDestroy {

  storageFacilitySubscription: Subscription;
  storageFacilityId: string;


  constructor(
    public inventory: InventoryService,
    private modalService: ModalService,
    private farm: FarmService,
    private router: Router
  ) 
  { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.show(template);
  }

  close() {
    this.router.navigate(["farms", this.farm.farmValue.id, "inventory"]);
  }
}
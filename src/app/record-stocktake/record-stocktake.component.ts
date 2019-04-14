import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InventoryService } from '../_services/inventory.service';
import { FarmService } from '../_services/farm.service';
import { Stocktake } from '../_models/inventory.models';
import { RecordStocktake } from '../_reqiests/inventory.requests';

@Component({
  selector: 'app-record-stocktake',
  templateUrl: './record-stocktake.component.html',
  styleUrls: ['./record-stocktake.component.sass']
})

export class RecordStocktakeComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();

  stocktake: RecordStocktake;

  constructor(
    public inventory: InventoryService,
    public farm: FarmService
  ) { }

  ngOnInit() {
    this.stocktake = new RecordStocktake();

  }

  save() {
    this.inventory.recordStocktake(this.farm.farmValue.id, this.inventory.storageFacilityValue.id, this.stocktake);
  }

  close() {
    this.closeModal.emit(true);
  }
}
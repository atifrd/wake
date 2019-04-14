import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HerdBooleans } from '../_models/feedplan.models';
import { MonthDisplay } from '../_models/shared.models';
import { FeedplanService } from '../_services/feedplan.service';
import { Route, Router } from '@angular/router';
import { FarmService } from '../_services/farm.service';

@Component({
  selector: 'app-stock-feeding-instructions-select',
  templateUrl: './stock-feeding-instructions-select.component.html',
  styleUrls: ['./stock-feeding-instructions-select.component.sass']
})

export class StockFeedingInstructionsSelectComponent implements OnInit {

  cowType: string;
  month: number;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(
    public feedplan: FeedplanService,
    private farm: FarmService,
    private router: Router
  ) { }

  ngOnInit() { }

  close() {
    this.closeModal.emit(true);
  }

  view() {
    this.closeModal.emit(true);
    this.router.navigate(["farms", this.farm.farmValue.id, "report", this.cowType, this.month, "instructions"]);
  }
}
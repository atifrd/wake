import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';
@Component({
  selector: 'app-help-daily-growth-rates',
  templateUrl: './help-daily-growth-rates.component.html',
  styleUrls: ['./help-daily-growth-rates.component.scss']
})
export class HelpDailyGrowthRatesComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

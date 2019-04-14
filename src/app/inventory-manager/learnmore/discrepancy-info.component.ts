import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-discrepancy-info',
  templateUrl: './discrepancy-info.component.html',
  styleUrls: ['./discrepancy-info.component.scss']
})
export class DiscrepancyInfoComponent implements OnInit {

  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

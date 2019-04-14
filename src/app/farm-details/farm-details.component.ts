import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { FarmService } from '../_services/farm.service';
import { AlertService } from '../_services/alert.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-farm-details',
  templateUrl: './farm-details.component.html',
  styleUrls: ['./farm-details.component.sass']
})

export class FarmDetailsComponent implements OnInit, OnDestroy {
  
  constructor(
    public farm: FarmService,
    private alert: AlertService,
    private modalService: ModalService
    ) { }

  ngOnInit() { }

  ngOnDestroy() { }

  editFarmDetails(template: TemplateRef<any>) {
    this.modalService.show(template);
   }

}
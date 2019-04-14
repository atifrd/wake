import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { FarmSettings, Farm } from '../_models/farm.models';
import { FarmService } from '../_services/farm.service';
import { ActivatedRoute } from '@angular/router';
import { UserSession } from '../_models/user.models';
import { Subscription } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';
import { EditFarmSettingsComponent } from '../edit-farm-settings/edit-farm-settings.component';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-farm-settings',
  templateUrl: './farm-settings.component.html',
  styleUrls: ['./farm-settings.component.sass']
})

export class FarmSettingsComponent implements OnInit, OnDestroy {

  constructor(
    public farm: FarmService,
    private alert: AlertService,
    private modalService: ModalService
  ) { }

  ngOnInit() { }

  ngOnDestroy() { }

  editFarmSettings(template: TemplateRef<any>) {
    this.modalService.show(template);
   }

}
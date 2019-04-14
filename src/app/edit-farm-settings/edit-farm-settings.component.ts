import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FarmSettings } from '../_models/farm.models';
import { FarmService } from '../_services/farm.service';
import { Subscribable, Subscription } from 'rxjs';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-edit-farm-settings',
  templateUrl: './edit-farm-settings.component.html',
  styleUrls: ['./edit-farm-settings.component.sass']
})

export class EditFarmSettingsComponent implements OnInit, OnDestroy {

  settings : FarmSettings;
  settingsSubscription: Subscription;


  constructor(public farm: FarmService , private modalService : ModalService) { 
    this.settings = new FarmSettings();
  }

  isFormValid() {
    if (
      this.settings.daysSinceFeedplanUpdate > 0 &&
      this.settings.daysSinceLastStocktake > 0 &&
      this.settings.daysUntilFeedRunout > 0
    ) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.settingsSubscription = this.farm.settings.subscribe(settings => {
      if(settings){
        this.settings.daysUntilFeedRunout = settings.daysUntilFeedRunout;
        this.settings.daysSinceLastStocktake = settings.daysSinceLastStocktake;
        this.settings.daysSinceFeedplanUpdate = settings.daysSinceFeedplanUpdate;
      }
    });
  }

  ngOnDestroy() {
    this.settingsSubscription.unsubscribe();
  }

  save() {
    console.log('Edit Farm Settings: Save clicked')
    this.farm.updateFarmSettings(
      this.farm.farmValue.id,
      this.settings
    );
  }

  cancel() {
    this.modalService.hide();
  }

}
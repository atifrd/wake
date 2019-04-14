import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FarmService } from '../_services/farm.service';
import { LookupService } from '../_services/lookup.service';
import { FarmLocation } from '../_models/farm.models';
import { Subscription } from 'rxjs';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-edit-farm-details',
  templateUrl: './edit-farm-details.component.html',
  styleUrls: ['./edit-farm-details.component.sass']
})
export class EditFarmDetailsComponent implements OnInit, OnDestroy {

  locations: Array<FarmLocation>;
  locationsSubscription: Subscription;

  locationsForRegion: Array<FarmLocation> = [];

  regions: Array<string> = [];
  regionsSubscription: Subscription;

  selectedLocation: FarmLocation;
  
  
  constructor(
    public farm: FarmService, 
    private lookupService: LookupService,
    private modalService : ModalService
    ) {

    this.regionsSubscription = this.lookupService.regions.subscribe(regions => {
      this.regions = regions;
    });

    this.locationsSubscription = this.lookupService.locations.subscribe(locations => {
      this.locations = locations;
    });

  }

  ngOnInit() {

  }

  chooseRegion(region: string) {
    console.log(`FarmDetailsComponent:updateLocation(${region},${location})`);
    //this.farm.farmValue.region = region;
    this.locationsForRegion = [];
    this.locations.forEach(location => {
      if (location.region === region) {
        this.locationsForRegion.push(location);
      }
    });
    this.locationsForRegion.forEach(locationForRegion => {
      console.log(`locations in ${region}: ${locationForRegion.name}`);
    });
  }

  chooseLocation(location: FarmLocation) {
    this.selectedLocation = location;
    this.farm.farmValue.location = location.name;
    console.log(`location chosen: ${location}`);
  }

  isFormValid() {
    if (
      this.farm.farmValue.address &&
      this.farm.farmValue.farmName &&
      this.farm.farmValue.managerName &&
      this.farm.farmValue.ownerName &&
      this.farm.farmValue.location
    ) {
      return true;
    }
    return false;
  }

  save() {
    this.farm.updateFarm(this.farm.farmValue);
    this.close();
  }

  close() {
    this.modalService.hide();
  }

  ngOnDestroy() {
    this.locationsSubscription.unsubscribe();
    this.regionsSubscription.unsubscribe();
  }

}

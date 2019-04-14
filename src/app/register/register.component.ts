import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { LookupService } from '../_services/lookup.service';
import { RegisterUser } from '../_reqiests/user.requests';
import { MomentModule } from 'ngx-moment';
import { FarmLocation } from '../_models/farm.models';
import { Subscription } from 'rxjs';
import { FeedCategory, GrowthRate } from '../_models/lookup.models';
import { StorageType } from '../_models/inventory.models';
import { Timezone } from '../_models/shared.models';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedType } from '../_models/feedplan.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  selectedLocation: FarmLocation;

  locations: Array<FarmLocation>;
  locationsSubscription: Subscription;

  locationsForRegion: Array<FarmLocation> = [];

  regions: Array<string> = [];
  regionsSubscription: Subscription;

  storageTypes: Array<StorageType>;
  storageTypesSubscription: Subscription;

  feedTypes: Array<FeedType>;
  feedTypesSubscription: Subscription;

  feedCategories: Array<FeedCategory>
  feedCategoriesSusbcription: Subscription;

  growthRate: GrowthRate;
  growthRateSubscription: Subscription;

  timezones: Array<Timezone>;
  timezonesSubscription: Subscription;

  registration: RegisterUser;

  strength = {
    password: '',
    value: 0,
    desc: ''
  };

  message: string = '';
  registering: boolean = false;

  constructor(
    private accountService: AccountService,
    private lookupService: LookupService,
    private formBuilder: FormBuilder
  ) {
    this.registration = new RegisterUser();
  }

  ngOnInit() {
    this.registration.timezone = "Austfralia/Melbourne";
    this.locationsSubscription = this.lookupService.locations.subscribe(locations => {
      this.locations = locations;
    });
    this.regionsSubscription = this.lookupService.regions.subscribe(regions => {
      this.regions = regions;
    });
    this.storageTypesSubscription = this.lookupService.storageTypes.subscribe(storageTypes => {
      this.storageTypes = storageTypes;
    });
    this.feedTypesSubscription = this.lookupService.feedTypes.subscribe(feeds => {
      this.feedTypes = feeds;
    });
    this.feedCategoriesSusbcription = this.lookupService.feedCategories.subscribe(feedCategories => {
      this.feedCategories = feedCategories;
    });
    this.growthRateSubscription = this.lookupService.growthRate.subscribe(growthRate => {
      this.growthRate = growthRate;
    });
    this.timezonesSubscription = this.lookupService.timezones.subscribe(timezones => {
      this.timezones = timezones;
    });

    this.registerForm = this.formBuilder.group({
      farmName: ['', Validators.required],
      farmAddress: ['', Validators.required],
      managerName: ['', Validators.required],
      ownerName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.locationsSubscription.unsubscribe();
    this.regionsSubscription.unsubscribe();
    this.storageTypesSubscription.unsubscribe();
    this.feedTypesSubscription.unsubscribe();
    this.feedCategoriesSusbcription.unsubscribe();
    this.growthRateSubscription.unsubscribe();
    this.timezonesSubscription.unsubscribe();
  }

  chooseRegion(region: string) {
    console.log(`RegisterComponent:updateLocation(${region},${location})`);
    this.registration.region = region;
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
    this.registration.location = location.name;
    console.log(`location chosen: ${location}`);
  }

  save() {
    if (this.registerForm.invalid)
      return;

    if (this.registration.location.length == 0)
      return;

    this.setRegisterProperties();

    this.registering = true;
    this.accountService.register(this.registration);
  }
  setRegisterProperties() {
    let controls = this.registerForm.controls;
    this.registration.farmName = controls.farmName.value;
    this.registration.farmAddress = controls.farmAddress.value;
    this.registration.managerName = controls.managerName.value;
    this.registration.ownerName = controls.ownerName.value;
    this.registration.firstName = controls.firstName.value;
    this.registration.lastName = controls.lastName.value;
    this.registration.email = controls.email.value;
    this.registration.password = controls.password.value;
  }
}
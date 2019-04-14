import { Injectable } from '@angular/core';
import { StorageType } from '../_models/inventory.models';
import { FeedCategory, GrowthRate } from '../_models/lookup.models';
import { FarmLocation, Farm } from '../_models/farm.models';
import { LookupBackend } from './lookup.backend';
import { Observable, BehaviorSubject } from 'rxjs';
import { AlertService } from './alert.service';
import { Timezone, MonthLookup } from '../_models/shared.models';
import { FeedType } from '../_models/feedplan.models';

@Injectable({
  providedIn: 'root'
})

export class LookupService {

  locations: Observable<Array<FarmLocation>>;
  private _locations: BehaviorSubject<Array<FarmLocation>>;

  map: Observable<Map<string, Array<FarmLocation>>>;
  private _map: BehaviorSubject<Map<string, Array<FarmLocation>>>;

  regions: Observable<Array<string>>;
  private _regions: BehaviorSubject<Array<string>>;

  storageTypes: Observable<Array<StorageType>>;
  private _storageTypes: BehaviorSubject<Array<StorageType>>;

  feedTypes: Observable<Array<FeedType>>;
  private _feedTypes: BehaviorSubject<Array<FeedType>>;

  feedCategories: Observable<Array<FeedCategory>>;
  private _feedCategories: BehaviorSubject<Array<FeedCategory>>;

  growthRate: Observable<GrowthRate>;
  private _growthRate: BehaviorSubject<GrowthRate>;

  timezones: Observable<Array<Timezone>>;
  private _timezones: BehaviorSubject<Array<Timezone>>;

  months: Observable<Array<MonthLookup>>;
  private _months: BehaviorSubject<Array<MonthLookup>>;

  private dataStore: {
    locations: Array<FarmLocation>,
    map: Map<string, Array<FarmLocation>>,
    regions: Array<string>,
    storageTypes: Array<StorageType>
    feedTypes: Array<FeedType>,
    feedCategories: Array<FeedCategory>,
    growthRate: GrowthRate,
    timezones: Array<Timezone>,
    months: Array<MonthLookup>
  };

  constructor(
    private lookupApi: LookupBackend,
    private alertService: AlertService
  ) {
    console.log('LookupService:constructor');

    this.dataStore = {
      locations: new Array<FarmLocation>(),
      map: new Map<string, Array<FarmLocation>>(),
      regions: new Array<string>(),
      storageTypes: new Array<StorageType>(),
      feedTypes: new Array<FeedType>(),
      feedCategories: new Array<FeedCategory>(),
      growthRate: new GrowthRate(),
      timezones: new Array<Timezone>(),
      months: new Array<MonthLookup>()
    };

    this._locations = <BehaviorSubject<FarmLocation[]>>new BehaviorSubject([]);
    this.locations = this._locations.asObservable();

    this._map = <BehaviorSubject<Map<string, FarmLocation[]>>>new BehaviorSubject(new Map<string, FarmLocation[]>());
    this.map = this._map.asObservable();

    this._regions = <BehaviorSubject<string[]>>new BehaviorSubject([]);
    this.regions = this._regions.asObservable();

    this._storageTypes = <BehaviorSubject<StorageType[]>>new BehaviorSubject([]);
    this.storageTypes = this._storageTypes.asObservable();

    this._feedTypes = <BehaviorSubject<FeedType[]>>new BehaviorSubject([]);
    this.feedTypes = this._feedTypes.asObservable();

    this._feedCategories = <BehaviorSubject<FeedCategory[]>>new BehaviorSubject([]);
    this.feedCategories = this._feedCategories.asObservable();

    this._growthRate = <BehaviorSubject<GrowthRate>>new BehaviorSubject(new GrowthRate());
    this.growthRate = this._growthRate.asObservable();

    this._timezones = <BehaviorSubject<Timezone[]>>new BehaviorSubject([]);
    this.timezones = this._timezones.asObservable();

    this._months = <BehaviorSubject<MonthLookup[]>>new BehaviorSubject([]);
    this.months = this._months.asObservable();

    this.loadLocations();
    this.loadMonths();
    this.loadFeedCategories();
    this.loadFeeds();
    this.loadStorageTypes();
  }

  public get locationsValue(): FarmLocation[] {
    return this._locations.value;
  }

  public get timezonesValue(): Timezone[] {
    return this._timezones.value;
  }

  public get regionsValue(): string[] {
    return this._regions.value;
  }

  public get storageTypesValue(): StorageType[] {
    return this._storageTypes.value;
  }

  public get feedTypesValue(): FeedType[] {
    return this._feedTypes.value;
  }

  public get feedCategoriesValue(): FeedCategory[] {
    return this._feedCategories.value;
  }

  public get growthRatesValue(): GrowthRate {
    return this._growthRate.value;
  }

  public get monthsValue(): MonthLookup[] {
    return this._months.value;
  }

  loadTimeZones() {

    let timezones = [
      { name: 'Australia/Melbourne', label: 'Melbourne' },
      { name: 'Australia/Sydney', label: 'Sydney' },
      { name: 'Australia/Adelaide', label: 'Adelaide' },
      { name: 'Australia/Perth', label: 'Perth' },
      { name: 'Australia/Hobart', label: 'Hobart' },
      { name: 'Australia/Brisbane', label: 'Brisbane' },
      { name: 'Australia/Lord_Howe', label: 'Lord Howe' },
      { name: 'Australia/Currie', label: 'Currie' },
      { name: 'Australia/Broken_Hill', label: 'Broken Hill' },
      { name: 'Australia/Lindeman', label: 'Lindeman' },
      { name: 'Australia/Darwin', label: 'Darwin' },
      { name: 'Australia/Eucla', label: 'Eucla' }
    ];

    this.dataStore.timezones = timezones.map(tz => {
      let timezone = new Timezone();
      timezone.label = tz.label;
      timezone.name = tz.name;
      return timezone;
    });

    this._timezones.next(Object.assign({}, this.dataStore).timezones);
  }

  loadMonths() {
    
    let months = [
      { name: 'January', days: 31, order: 1 },
      { name: 'February', days: 28, order: 2 },
      { name: 'March', days: 31, order: 3 },
      { name: 'April', days: 30, order: 4 },
      { name: 'May', days: 31, order: 5 },
      { name: 'June', days: 30, order: 6 },
      { name: 'July', days: 31, order: 7 },
      { name: 'August', days: 31, order: 8 },
      { name: 'September', days: 30, order: 9 },
      { name: 'October', days: 31, order: 10 },
      { name: 'November', days: 30, order: 11 },
      { name: 'December', days: 31, order: 12 }
    ];

    this.dataStore.months = months.map(m => {
      let month = new MonthLookup();
      month.name = m.name;
      month.days = m.days;
      month.order = m.order;
      return month;
    });

    this._months.next(Object.assign({}, this.dataStore).months);
  }

  loadStorageTypes() {
    console.log(`Lookup Service: loadStorageTypes()`);
    this.lookupApi.getStorageTypes().subscribe(
      data => {
        this.dataStore.storageTypes = data;
        this._storageTypes.next(Object.assign({}, this.dataStore).storageTypes);
      },
      error => this.alertService.handleError(error)
    );
  }

  loadFeeds() {
    console.log(`Lookup Service: loadFeeds()`);
    this.lookupApi.getFeeds().subscribe(
      data => {
        ///Note : data changed to data.items
        this.dataStore.feedTypes = data.items;
        this._feedTypes.next(Object.assign({}, this.dataStore).feedTypes);
      },
      error => this.alertService.handleError(error)
    );
  }

  loadFeedCategories() {
    console.log(`Lookup Service: loadFeedCategories()`);
    this.lookupApi.getFeedCategories().subscribe(
      data => {
        this.dataStore.feedCategories = data;
        this._feedCategories.next(Object.assign({}, this.dataStore).feedCategories);
      },
      error => this.alertService.handleError(error)
    );
  }

  loadLocations() {
    console.log(`Lookup Service: loadFarmLocations()`);
    this.lookupApi.getLocations().subscribe(
      data => {
        this.dataStore.locations = data;
        this._locations.next(Object.assign({}, this.dataStore).locations);
        // also setup the regions:
        let regions = [];
        data.forEach((location, index) => {
          if (!regions.find(f => f == location.region)) {
            //skip
            regions.push(location.region);
          }
        });

        this.dataStore.regions = regions;
        this._regions.next(Object.assign({}, this.dataStore).regions);
      },
      error => {
        this.alertService.handleError(error);
      }
    );
  }

  getFeed(name: string) {
    console.log(`Lookup Service: getFeed(${name})`);
    this.lookupApi.getFeed(name).subscribe(
      data => { return data; },
      error => { this.alertService.handleError(error); }
    );
  }

  getFeedsByCategory(category: string) {
    console.log(`Lookup Service: getFeedsByCategory(${category})`);
    this.lookupApi.getFeedsByCategory(category).subscribe(
      data => { return data; },
      error => { this.alertService.handleError(error); }
    );
  }

  getFeedsByStorageType(storageTypeId: string) {
    console.log(`Lookup Service: getFeedsByStorageType(${storageTypeId})`);
    this.lookupApi.getFeedsByStorageFacility(storageTypeId).subscribe(
      data => { return data; },
      error => { this.alertService.handleError(error); }
    );
  }

  getFeedsByStorageFacility(storageFacilityId: string) {
    console.log(`Lookup Service: getFeedsByStorageFacility(${storageFacilityId})`);
    this.lookupApi.getFeedsByStorageFacility(storageFacilityId).subscribe(
      data => { return data; },
      error => { this.alertService.handleError(error); }
    );
  }

  loadFeedGrowthRates(feedType: string, location: string, month: string) {
    console.log(`Lookup Service: loadFeedGrowthRates(feedType: ${feedType}, location: ${location}, month: ${month})`);
    this.lookupApi.getFeedGrowthRate(feedType, location, month).subscribe(
      data => {
        // TODO - nut out collection or object?
        this.dataStore.growthRate = data;
        this._growthRate.next(Object.assign({}, this.dataStore).growthRate);
      },
      error => this.alertService.handleError(error)
    );
  }

  clearGrowthRate() {
    this.dataStore.growthRate = new GrowthRate();
    this._growthRate.next(Object.assign({}, this.dataStore).growthRate);
  }
}
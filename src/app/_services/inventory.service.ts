import { Injectable } from '@angular/core';
import { StorageFacility, Delivery, StorageFeedRates, Stocktake, Task, StorageType, AnimalFeedRate, StorageMetrics } from '../_models/inventory.models';
import { Observable, BehaviorSubject } from 'rxjs';
import { InventoryBackendService } from './inventory.backend';
import { AlertService } from './alert.service';
import { LookupService } from './lookup.service';
import * as _ from 'lodash';
import { RecordDelivery, RecordStocktake, AddStorageFacility } from '../_reqiests/inventory.requests';
import { FarmService } from './farm.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  storageFacilities: Observable<StorageFacility[]>;
  private _storageFacilities: BehaviorSubject<StorageFacility[]>;

  storageFacility: Observable<StorageFacility>;
  private _storageFacility: BehaviorSubject<StorageFacility>;

  deliveries: Observable<Delivery[]>;
  private _deliveries: BehaviorSubject<Delivery[]>;

  stocktakes: Observable<Stocktake[]>;
  private _stocktakes: BehaviorSubject<Stocktake[]>;

  // For Current Storage Facility
  delivery: Observable<Delivery>;
  private _delivery: BehaviorSubject<Delivery>;

  task: Observable<Task>;
  private _task: BehaviorSubject<Task>;

  storageType: Observable<StorageType>;
  private _storageType: BehaviorSubject<StorageType>;

  feedRates: Observable<AnimalFeedRate>;
  private _feedRates: BehaviorSubject<AnimalFeedRate>;
  
  private dataStore: {
    storageFacilities: StorageFacility[],
    deliveries: Delivery[],
    stocktakes: Stocktake[],
    storageFacility: StorageFacility,
    delivery: Delivery,
    task: Task,
    storageType: StorageType
  };

  constructor(
    private inventoryApi: InventoryBackendService,
    private alertService: AlertService,
    private lookupService: LookupService,
    private farmService: FarmService
    ) 
  {
    console.log('InventoryService:Constructor');

    this.dataStore = { 
      storageFacilities: new Array<StorageFacility>(),
      deliveries: new Array<Delivery>(),
      stocktakes: new Array<Stocktake>(),
      storageFacility: null,
      delivery: null,
      task: null,
      storageType: null
    };

    this._storageFacilities = <BehaviorSubject<Array<StorageFacility>>>new BehaviorSubject(new Array<StorageFacility>());
    this.storageFacilities = this._storageFacilities.asObservable();

    this._deliveries = <BehaviorSubject<Array<Delivery>>>new BehaviorSubject(new Array<Delivery>());
    this.deliveries = this._deliveries.asObservable();

    this._stocktakes = <BehaviorSubject<Array<Stocktake>>>new BehaviorSubject(new Array<Stocktake>());
    this.stocktakes = this._stocktakes.asObservable();

    this._storageFacility = <BehaviorSubject<StorageFacility>>new BehaviorSubject(new StorageFacility());
    this.storageFacility = this._storageFacility.asObservable();

    this._delivery = <BehaviorSubject<Delivery>>new BehaviorSubject(new Delivery());
    this.delivery = this._delivery.asObservable();

    this._task = <BehaviorSubject<Task>>new BehaviorSubject(new Task());
    this.task = this._task.asObservable();

    this._storageType = <BehaviorSubject<StorageType>>new BehaviorSubject(new StorageType());
    this.storageType = this._storageType.asObservable();

    this._feedRates = <BehaviorSubject<AnimalFeedRate>>new BehaviorSubject(new AnimalFeedRate());
    this.feedRates = this._feedRates.asObservable();

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser && currentUser.farm.id) {
      console.log(`loading inventory for farm ${currentUser.farm.id}`);
      this.loadInventory(currentUser.farm.id);
    }
  }

  public get taskValue(): Task {
    return this._task.value;
  }

  public set taskValue(task: Task) {
    this._task = new BehaviorSubject<Task>(task);
    this.task = this._task.asObservable();
  }

  public get storageFacilityValue(): StorageFacility {
    return this._storageFacility.value;
  }

  public set storageFacilityValue(storageFacility: StorageFacility) {
    this._storageFacility = new BehaviorSubject<StorageFacility>(storageFacility);
    this.storageFacility = this._storageFacility.asObservable();
  }

  public get storageFacilitiesValue(): Array<StorageFacility> {
    return this._storageFacilities.value;
  }

  public set storageFacilitiesValue(storageFacilities: Array<StorageFacility>) {
    this._storageFacilities = new BehaviorSubject<Array<StorageFacility>>(storageFacilities);
    this.storageFacilities = this._storageFacilities.asObservable();
  }

  public get stocktakesValue(): Array<Stocktake> {
    return this._stocktakes.value;
  }

  public get storageTypeValue(): StorageType {
    return this._storageType.value;
  }

  public set storageTypeValue(storageType: StorageType) {
    this._storageType = new BehaviorSubject<StorageType>(storageType);
    this.storageType = this._storageType.asObservable();
  }

  public get feedRatesValue(): AnimalFeedRate {
    return this._feedRates.value;
  }

  public set feedRatesValue(feedRates: AnimalFeedRate) {
    this._feedRates = new BehaviorSubject<AnimalFeedRate>(feedRates);
    this.feedRates = this._feedRates.asObservable();
  }

  loadInventory(farmid: string): void {
    console.log(`Inventory Service: loadInventory({farmid})`);
    this.inventoryApi.get(farmid).subscribe(
      data => {
        data.forEach(inventory => {
          this.dataStore.storageFacilities.push(this.calculateMetrics(inventory));
        });

        this._storageFacilities.next(Object.assign({}, this.dataStore).storageFacilities);
      },
      error => this.alertService.handleError(error)
    );
  }

  getStorageFacility(farmId: string, storageFacilityId: string){
    this.inventoryApi.getStorageFacility(farmId, storageFacilityId).subscribe(
      data => {
        var storageFacility = this.calculateMetrics(data);
        this.dataStore.storageFacility = storageFacility;
        this._storageFacility.next(Object.assign({}, this.dataStore).storageFacility);
      },
      error => this.alertService.handleError(error)
    );
  }

  getStorageFacilityDeliveries(farmId: string, storageFacilityId: string){
    this.inventoryApi.getStorageFacilityDeliveries(farmId, storageFacilityId).subscribe(
      data => {
        this.dataStore.deliveries = data;
        this._deliveries.next(Object.assign({}, this.dataStore).deliveries);
      },
      error => this.alertService.handleError(error)
    );
  }

  getStorageFacilityStocktakes(farmId: string, storageFacilityId: string){
    this.inventoryApi.getStorageFacilityStocktakes(farmId, storageFacilityId).subscribe(
      data => {
        this.dataStore.stocktakes = data;
        this._stocktakes.next(Object.assign({}, this.dataStore).stocktakes);
      },
      error => this.alertService.handleError(error)
    );
  }

  // getDefaultStorageImage() {

  // }

  newStorageFacility(){
    let newStorageFacility = new StorageFacility();
    this.dataStore.storageFacility = newStorageFacility;
    this._storageFacility.next(Object.assign({}, this.dataStore).storageFacility);
  }

  // updateStorageFacilityFeedrate(farmId: string, storageFacilityId: string, feedRates: StorageFeedRates){
  //   return this.http.put<Delivery>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}/feedrates`, feedRates);
  // }

  // getStorageFacilities(farmId: string){
  //   return this.http.get<StorageFacility[]>(`${environment.apiUrl}/farms/${farmId}/storage`);
  // }

  // addStorageFacility(farmId: string, storageFacility: StorageFacility){
  //   return this.http.post<StorageFacility>(`${environment.apiUrl}/farms/${farmId}/storage/`, storageFacility);
  // }

  // updateStorageFacility(farmId: string, storageFacilityId: string, storageFacility: StorageFacility){
  //   return this.http.put<StorageFacility>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}`, storageFacility);
  // }

  updateStorageFacilityName(farmId: string, storageFacilityId: string, storageFacility: StorageFacility){
    this.inventoryApi.updateStorageFacilityName(farmId, storageFacilityId, storageFacility).subscribe(
      data => {
        this.dataStore.storageFacility = data;
        this._storageFacility.next(Object.assign({}, this.dataStore).storageFacility);
      },
      error => this.alertService.handleError(error)
    );
  }

  // removeStorageFacility(farmId: string, storageFacilityId: string){
  //   return this.http.delete<StorageFacility>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}`);
  // }

  // recordStorageFacilityDelivery(farmId: string, storageFacilityId: string, delivery: Delivery){
  //   return this.http.post<Delivery>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}/deliveries`, delivery);
  // }

  recordStocktake(farmId: string, storageFacilityId: string, stocktake:RecordStocktake){
    this.inventoryApi.recordStorageFacilityStocktake(farmId, storageFacilityId, stocktake).subscribe(
      data => {
        this.dataStore.stocktakes.push(data);
        this._stocktakes.next(Object.assign({}, this.dataStore).stocktakes);
      },
      error => this.alertService.handleError(error)
    );

    // return this.http.post<StorageFacility>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}/stocktakes`, stocktake);
  }

  /*
    This is all the capability to create a new storage facility
  */
  configure(){
    switch (this.taskValue.name ) {
        case 'setup':
        {
          this.taskValue.steps =  ['setDetails', 'setCapacity', 'setFeedType', 'setLevel', 'setFeedRate'];
          //this.onStorageFacilityChange = $scope.$watch('this.storageFacility', onStorageFacilityChange, true);
        } break;
        case 'stocktake':
        {
          this.taskValue.steps =  ['setFeedType',  'setLevel', 'setFeedRate'];
          //this.onStorageFacilityChange = $scope.$watch('this.storageFacility', onStorageFacilityChange, true);
        } break;
        case 'delivery':
        {
          this.taskValue.steps = ['setFeedType', 'setDelivery'];
          //this.onStorageFacilityChange = $scope.$watch('this.storageFacility', onStorageFacilityChange, true);
        } break;
        default: break;
    }
    this.taskValue.step = this.taskValue.steps[0];
  }

  // ACTIONS

  isFirstStep() {
    return this.taskValue.step === this.taskValue.steps[0];
  }

  isLastStep() {
    return this.taskValue.step === this.taskValue.steps[this.taskValue.steps.length - 1];
  }

 isStepValid(storageFacility: StorageFacility) : boolean {
    var formName = '';
    if (this.taskValue.step === 'setCapacity') {
      formName = this.taskValue.step + storageFacility.storageType.storageShape.replace(/ /gi, '') + 'Form';
      return this[formName].$valid;
    } else if (this.taskValue.step === 'setLevel') {
      formName = this.taskValue.step + storageFacility.storageType.levelMeasurementMethod.replace(/ /gi, '') + 'Form';
      return this[formName].$valid && this.stocktakeLevelIsWithinCapacity(storageFacility);
    } else if (this.taskValue.step === 'setFeedType') {
      if (this.storageFacility) { // Check if storage is loaded yet (releavnt to stocktake and delivery tasks)
        return storageFacility.lastStocktake.feed !== null;
      }
      return false;
    } else {
      formName = this.taskValue.step + 'Form';
      return this[formName].$valid;
    }
  }

  goBack(){
    this.taskValue.stepIndex = this.taskValue.stepIndex - 1;
    this.taskValue.step = this.taskValue.steps[this.taskValue.stepIndex-1];
    this.taskValue.isLastStep = this.taskValue.steps.length == this.taskValue.stepIndex + 1;
    this.taskValue.isFirstStep = this.taskValue.stepIndex == 0;
    this[this.taskValue.step]();
  }

  goToNextStep(){
    this.taskValue.step = this.taskValue.steps[this.taskValue.stepIndex];
    this.taskValue.isLastStep = this.taskValue.steps.length == this.taskValue.stepIndex + 1;
    this.taskValue.isFirstStep = this.taskValue.stepIndex == 0;
    this.taskValue.stepIndex++;
    this[this.taskValue.step]();
  }

  feedTypesQuantifiedAsSelected() {
    //this.taskValue.feedRateQuantifiedAs = _.find(this.feedTypesQuantifiedValues, (item){return item.value == storageFacility.feedRates.quantifiedAs;});
  }

  storageTypeSelected(){
    // storageFacility.storageType = _.find(this.storageTypes, storage => {return storage. == this.taskValue.storageTypeId;});
    // this.taskValue.storageImage = storageFacility.getDefaultStorageImage();
  }

  onStorageFacilityChange() {
    if (this.storageFacility){
      // storageFacility.calculateMetrics();

      // if (this.taskValue.step === 'setDetails' || this.taskValue.step === 'setCapacity' || this.taskValue.step === 'setFeedType') {
      //   if (storageFacility.storageType) {
      //     this.taskValue.storageImage = storageFacility.getDefaultStorageImage();
      //   }
      // } else {
      //   this.taskValue.storageImage = storageFacility.metrics.lastStocktakeFeedLevelImage;
      // }
    }
  }

  feedCategorySelected(category:string) {
    this.taskValue.feedCategory = category;
  }

  feedTypeSelected(feed) {
    // HC - Commented out while we build up the setup
    // if (this.taskValue.name === 'delivery') {
    //   storageFacility.lastDelivery.feed = feed;
    // } else {
    //   storageFacility.lastStocktake.feed = feed;
    // }
  }

  close(){
    // $modalInstance.dismiss();
  }

 save(storageFacility: StorageFacility) {

  var model = {};

  switch(this.taskValue.name){
      case 'setup':
      {
        var recordStorageFacility = new AddStorageFacility();

        recordStorageFacility.storageTypeId = storageFacility.storageType.id;
        recordStorageFacility.name = storageFacility.name;
        recordStorageFacility.width = storageFacility.dimensions.width;
        recordStorageFacility.height = storageFacility.dimensions.height;
        recordStorageFacility.length = storageFacility.dimensions.length;
        recordStorageFacility.diameter = storageFacility.dimensions.diameter;
        recordStorageFacility.coneHeight = storageFacility.dimensions.coneHeight;
        recordStorageFacility.bags = storageFacility.dimensions.bags;
        recordStorageFacility.bales = storageFacility.dimensions.bales;
        recordStorageFacility.level = storageFacility.lastStocktake.level;
        recordStorageFacility.feedId = storageFacility.lastStocktake.feed.id;
        recordStorageFacility.unitWeight = storageFacility.lastStocktake.unitWeight;
        recordStorageFacility.unitValue = storageFacility.lastStocktake.unitValue;
        recordStorageFacility.dryMatter = storageFacility.lastStocktake.dryMatter;
        recordStorageFacility.feedRateQuantifiedAs = storageFacility.feedRates.quantifiedAs;
        recordStorageFacility.milkersNumber = storageFacility.feedRates.milkers.number;
        recordStorageFacility.milkersConsumed = storageFacility.feedRates.milkers.consumed;
        recordStorageFacility.milkersWastage = storageFacility.feedRates.milkers.wastage;
        recordStorageFacility.dryNumber = storageFacility.feedRates.dry.number;
        recordStorageFacility.dryConsumed = storageFacility.feedRates.dry.consumed;
        recordStorageFacility.dryWastage = storageFacility.feedRates.dry.wastage;
        recordStorageFacility.transitionNumber = storageFacility.feedRates.transition.number;
        recordStorageFacility.transitionConsumed = storageFacility.feedRates.transition.consumed;
        recordStorageFacility.transitionWastage = storageFacility.feedRates.transition.wastage;

        this.inventoryApi.addStorageFacility(
          this.taskValue.farmId,
          recordStorageFacility
        ).subscribe(
          data => {

          },
          error => {

          }
        );
      }
      break;
      case 'delivery':
      {
        var recordDelivery = new RecordDelivery();

        recordDelivery.feedId = storageFacility.lastDelivery.feed.id;
        recordDelivery.productName = storageFacility.lastDelivery.productName;
        recordDelivery.quantity = storageFacility.lastDelivery.quantity;
        recordDelivery.unitWeight = storageFacility.lastDelivery.unitWeight;

        this.inventoryApi.recordStorageFacilityDelivery(
          this.taskValue.farmId,
          this.taskValue.storageFacilityId, 
          recordDelivery
          ).subscribe(
            data => {
              // what do do?
              
            },
            error => {

            }
          );
      }
      break;
      case 'stocktake':
      {
        var recordStocktake = new RecordStocktake();     

        recordStocktake.level = storageFacility.lastStocktake.level;
        recordStocktake.feedId = storageFacility.lastStocktake.feed.id;
        recordStocktake.unitWeight = storageFacility.lastStocktake.unitWeight;
        recordStocktake.unitValue = storageFacility.lastStocktake.unitValue;
        recordStocktake.dryMatter = storageFacility.lastStocktake.dryMatter;

        this.inventoryApi.recordStorageFacilityStocktake(
          this.taskValue.farmId,
          this.taskValue.storageFacilityId, 
          recordStocktake
          ).subscribe(
            data => {
              // what do do?
              
            },
            error => {
              
            }
          );
      }
      break;
      default:break;
  }
}

// TASKS
 setup(){
  this.taskValue.stepTitle = 'Storage Facility';

  // // load data
  //this.storageFacility = this.inventoryService.newStorageFacility();

  // var promises = [loadStorageTypes()];
  // return $q.all(promises).then(
  //     (response) {
  //       goToNextStep();
  //     },
  //     (failure){
  //         logger.error(failure);
  //     }
  // );
}

 stocktake(){
  
  this.taskValue.stepTitle = 'Stocktake';

  // // load data
  // var promises = [
  //   loadStorageTypes(),
  //   loadStorageFacility(this.taskValue.farmId, this.taskValue.storageFacilityId)
  // ];
  // return $q.all(promises).then(
  //     (response) {
  //       var lastStocktakeFeed = storageFacility.lastStocktake.feed;
  //       storageFacility.lastStocktake({
  //         recorded: moment().toISOString(),
  //         level: 0,
  //         dryMatter: 0,
  //         unitWeight: 0,
  //         unitValue: 0,
  //         feed: lastStocktakeFeed
  //       });
  //       goToNextStep();
  //     },
  //     (failure){
  //         logger.error(failure);
  //     }
  // );
}

 doDelivery(){
  
  this.taskValue.stepTitle = 'Delivery';

  // load data
  // var promises = [
  //     loadStorageFacility(this.taskValue.farmId, this.taskValue.storageFacilityId)
  // ];
  // return $q.all(promises).then(
  //     (response) {
  //       var lastStocktakeFeed = storageFacility.lastStocktake.feed;
  //       storageFacility.setLastDelivery({
  //         delivered: moment().toISOString(),
  //         productName: '',
  //         quantity: 0,
  //         unitWeight: 0,
  //         feed: lastStocktakeFeed
  //       });
  //       goToNextStep();
  //     },
  //     (failure){
  //         logger.error(failure);
  //     }
  // );
}

// STEPS
 setDetails(){
  this.taskValue.stepInstruction = 'Choose a feed storage type and enter the name or description of the facility.';
}

 setCapacity(){
  this.taskValue.stepInstruction = 'Enter the capacity of the storage facility.';
}

 setFeedType(){
  this.taskValue.stepInstruction = 'Select the type of feed to be stored in the storage facility.';

  // this.taskValue.storageImage = storageFacility.getDefaultStorageImage();

  // var promises = [loadFeeds()];
  // return $q.all(promises).then(
  //     (response) {
  //         logger.info('feeds loaded', response);
  //     },
  //     (failure){
  //         logger.error(failure);
  //     }
  // );
}

 setFeedRate(){
  this.taskValue.stepInstruction = 'Enter the amount consumed and wasted for each animal type.';
}

 setLevel(storageFacility: StorageFacility){
  this.taskValue.stepInstruction = 'Enter the current amount of the feed stored in the facility.';

  this.taskValue.storageImage = storageFacility.metrics.lastStocktakeFeedLevelImage;

  var feed = _.find(this.lookupService.feedTypesValue, item => {
    return item.id === storageFacility.lastStocktake.feed.id;
  });

  if ((storageFacility.storageType.storageShape !== 'bags' && storageFacility.storageType.storageShape !== 'bales') &&
    (feed.typicalWetDensity !== null && feed.minWetDensity !== null && feed.maxWetDensity !== null)) {
    this.taskValue.wetDensities.hasValues = true;
    this.taskValue.wetDensities.min = feed.minWetDensity;
    this.taskValue.wetDensities.max = feed.maxWetDensity;
    this.taskValue.wetDensities.typical = feed.typicalWetDensity;

    storageFacility.lastStocktake.unitWeight = feed.typicalWetDensity;
  }
  storageFacility.lastStocktake.dryMatter = feed.dm / 10;
}

 setDelivery (){
  this.taskValue.stepInstruction = 'Enter the details of the delivery.';
}

// DATA
//  loadStorageFacility(farmId, storageFacilityId){
//   return this.getStorageFacility(farmId, storageFacilityId).subscribe(
//           storageFacility => {
//               this.storageFacility = storageFacility;
//               this.taskValue.storageTypeId = storageFacility.storageType.id;
//           }
//       );
// }

//  loadStorageTypes(){
//   return lookupService.getStorageTypes().then(
//           (storageTypes){
//               this.storageTypes = storageTypes;
//           }
//       );
// }

//  loadFeeds(){
//   return lookupService
//   .getFeedsByStorageType(storageFacility.storageType.id)
//   .then((data){
//     sortFeedResults(data);

//     if (storageFacility.lastStocktake.feed) {
//       this.taskValue.feedCategory = storageFacility.lastStocktake.feed.category;
//     }
//   });
// }

//  sortFeedResults(data){
//   for (var index = 0; index < data.length; index++) {
//       this.feeds.push(data[index]);
//       this.feedCategories.push(data[index].category);
//   }

//   var feedCategories = _.uniq(this.feedCategories);

//   this.feedCategories = _.sortBy(feedCategories,  (element){
//       var rank = {
//           'Pastures':1,
//           'Other grazed forages':2,
//           'Silages':3,
//           'Hays':4,
//           'Grains and concentrates':5,
//           'Minerals and additives':6,
//           'By products including straws':7
//       };

//       return rank[element];
//   });

//   if (this.taskValue.feedCategory === null) {
//     this.taskValue.feedCategory = this.feedCategories[0];
//   }
//   return this.feeds;
// }

  setLastStocktake(storageFacility: StorageFacility, newStocktake: Stocktake){
    storageFacility.lastStocktake = newStocktake;
    this.calculateMetrics(storageFacility);
  }

  setLastDelivery(storageFacility: StorageFacility, lastDelivery: Delivery){
    storageFacility.lastDelivery = lastDelivery;
    this.calculateMetrics(storageFacility);
  }

  setFeedRates(storageFacility: StorageFacility, feedRates: StorageFeedRates) {
    storageFacility.feedRates = feedRates;
    this.calculateMetrics(storageFacility);
  }

  calculateMetrics(storageFacility: StorageFacility) : StorageFacility{

    if (!storageFacility.metrics) {
      storageFacility.metrics = new StorageMetrics();
    }
    if (storageFacility.storageType) {
      
      var farmSettings = this.farmService.settingsValue;

      var now = moment.utc();

      storageFacility.metrics.capacity = this.calculateCapacity(storageFacility);
      storageFacility.metrics.runoutDate = this.calculateRunoutDate(storageFacility).toDate();
      storageFacility.metrics.runoutDays = Math.floor(moment.utc(storageFacility.metrics.runoutDate).diff(now, 'days', true));
      storageFacility.metrics.runoutDaysDescription = storageFacility.metrics.runoutDays > 730 ? '2+ years' : storageFacility.metrics.runoutDays + ' day' + (storageFacility.metrics.runoutDays !== 1 ? 's' : '');
      storageFacility.metrics.nextStocktakeDays = Math.ceil(moment.utc(storageFacility.lastStocktake.recorded).add(farmSettings.daysSinceLastStocktake, 'days').diff(now, 'days', true));
      storageFacility.metrics.nextStocktakeDate = moment.utc(storageFacility.lastStocktake.recorded).add(farmSettings.daysSinceLastStocktake, 'days').toDate();
      storageFacility.metrics.nextStocktakeWarning = storageFacility.metrics.nextStocktakeDays < 0;

      storageFacility.metrics.lastStocktakeWeightDm = this.calculateLastStocktakeFeedWeightDryMatter(storageFacility);
      storageFacility.metrics.lastStocktakeWeightAsFed = this.calculateLastStocktakeFeedWeightAsFed(storageFacility);
      storageFacility.metrics.lastStocktakeFeedLevelVolume = this.calculateLastStocktakeFeedVolume(storageFacility);
      storageFacility.metrics.lastStocktakeFeedLevelPercentage = (storageFacility.metrics.lastStocktakeFeedLevelVolume / storageFacility.metrics.capacity) * 100;
      storageFacility.metrics.lastStocktakeFeedLevelImage = this.getStorageImageUri(storageFacility);

      storageFacility.metrics.dailyTotalUsageRate = this.calculateDailyTotalUsageRate(storageFacility);
      storageFacility.metrics.lastStocktakeMarketValue = this.calculateLastStocktakeMarketValue(storageFacility);

      storageFacility.metrics.runoutWarning = storageFacility.metrics.dailyTotalUsageRate > 0 && storageFacility.metrics.runoutDays <= farmSettings.daysUntilFeedRunout;

      var daysSinceLastStocktake = Math.ceil(now.diff(moment.utc(storageFacility.lastStocktake.recorded), 'days', true));
      storageFacility.metrics.currentWeightDm = (this.calculateLastStocktakeFeedWeightDryMatter(storageFacility) - (daysSinceLastStocktake * this.calculateDailyTotalUsageRateSpecified(storageFacility, 'dm')));
      storageFacility.metrics.currentWeightAsFed = (this.calculateLastStocktakeFeedWeightAsFed(storageFacility) - (daysSinceLastStocktake * this.calculateDailyTotalUsageRateSpecified(storageFacility, 'as fed')));

      if (storageFacility.metrics.runoutDays < 0) {
        storageFacility.metrics.runoutDaysDescription = 'Feed ran out ' + (storageFacility.metrics.runoutDays * -1) + ' day' + (storageFacility.metrics.runoutDays !== 1 ? 's' : '') + ' ago';
      }
      if (storageFacility.metrics.currentWeightDm < 0) {
        storageFacility.metrics.currentWeightDm = 0;
      }
      if (storageFacility.metrics.currentWeightAsFed < 0) {
        storageFacility.metrics.currentWeightAsFed = 0;
      }

      // Projected feed levels
      var capacityWeightAsFed = 0;
      if (storageFacility.storageType.storageShape !== 'bales' && storageFacility.storageType.storageShape !== 'bags') {
        var capacityWeight = storageFacility.metrics.capacity * (storageFacility.lastStocktake.unitWeight/1000);
        capacityWeightAsFed = capacityWeight;
        storageFacility.metrics.currentFeedLevelPercentage = (storageFacility.metrics.currentWeightAsFed / capacityWeight) * 100;
        storageFacility.metrics.currentFeedLevelImage = this.getStorageImageUri(storageFacility);
      } else {
        capacityWeightAsFed = storageFacility.metrics.capacity * (storageFacility.lastStocktake.unitWeight/1000);
        var numberOfBalesUsed = storageFacility.metrics.currentWeightAsFed / (storageFacility.lastStocktake.unitWeight / 1000);
        var currentLevelInBales = storageFacility.lastStocktake.level - numberOfBalesUsed;
        // how many bales does it hold
        var capacity = storageFacility.metrics.capacity;
        var currentLevel = capacity - currentLevelInBales;
        var currentPercentage = (currentLevel / capacity) * 100;
        storageFacility.metrics.currentFeedLevelPercentage = currentPercentage;
        storageFacility.metrics.currentFeedLevelImage = this.getStorageImageUri(storageFacility);
      }

      // Stocktake level discrepancy
      if (storageFacility.storageBeforeStocktake) {
        storageFacility.metrics.hasStocktakeDiscrepancy = false;
        if (storageFacility.lastStocktake.unitWeight > 0) {
          // Get the old stocktake, get projected feed level based on it
          // Get the current stocktake feed level
          // Calc the % difference
          var discrepancyAsFed = storageFacility.metrics.lastStocktakeWeightAsFed - storageFacility.storageBeforeStocktake.metrics.currentWeightAsFed;
          var discrepancyPercentage = Math.abs((discrepancyAsFed / storageFacility.storageBeforeStocktake.metrics.currentWeightAsFed) * 100);
          storageFacility.metrics.hasStocktakeDiscrepancy = discrepancyPercentage > 10;
          storageFacility.metrics.feedLevelDiscrepancyAsFed = discrepancyAsFed;
          storageFacility.metrics.feedLevelDiscrepancyPercentage = discrepancyPercentage;
        }
      }
    }

    return storageFacility;
  }

  stocktakeLevelIsWithinCapacity(storageFacility: StorageFacility) {
    switch (storageFacility.storageType.levelMeasurementMethod)
    {
      case "from back":
        return storageFacility.lastStocktake.level <= storageFacility.dimensions.length;
      case "bags":
        return storageFacility.lastStocktake.level <= storageFacility.dimensions.bags;
      case "from bottom":
        return storageFacility.lastStocktake.level <= storageFacility.dimensions.height;
      case "bales":
        return storageFacility.lastStocktake.level <= storageFacility.dimensions.bales;
      case "from cone bottom":
        return storageFacility.lastStocktake.level <= storageFacility.dimensions.height;
      default:
          throw new Error('Specified levelMeasurementMethod is not recognised');
    }
  }

  calculateLastStocktakeMarketValue(storageFacility: StorageFacility) {
    return this.calculateLastStocktakeFeedWeightAsFed(storageFacility) * storageFacility.lastStocktake.unitValue;
  }

  calculateCapacity(storageFacility: StorageFacility)
  {
    switch (storageFacility.storageType.storageShape)
    {
      case "rectangle":
          return storageFacility.dimensions.width * storageFacility.dimensions.height * storageFacility.dimensions.length;
      case "cylinder":
          return storageFacility.dimensions.height * Math.PI * Math.pow(storageFacility.dimensions.diameter / 2, 2);
      case "tube":
          return storageFacility.dimensions.length * Math.PI * Math.pow(storageFacility.dimensions.diameter / 2, 2);
      case "bales":
          return storageFacility.dimensions.bales;
      case "coned cylinder":
          var cylinderVolume = (storageFacility.dimensions.height - storageFacility.dimensions.coneHeight) * Math.PI * Math.pow(storageFacility.dimensions.diameter / 2, 2);
          var coneVolume = (storageFacility.dimensions.coneHeight * Math.PI * Math.pow(storageFacility.dimensions.diameter / 2, 2)) / 3;
          return cylinderVolume + coneVolume;
      case "bags":
          return storageFacility.dimensions.bags;
      default:
          throw new Error('Specified storageShape is not recognised');
    }
  }

  calculateRunoutDate(storageFacility: StorageFacility) {
    var amountOfFeedInTonnes = 0;

    if (this.feedRatesValue.quantifiedAs === "dm")
    {
        amountOfFeedInTonnes = this.calculateLastStocktakeFeedWeightDryMatter(storageFacility);
    } else
    {
        amountOfFeedInTonnes = this.calculateLastStocktakeFeedWeightAsFed(storageFacility);
    }

    var dailyTotalUsageRateInTonnes = this.calculateDailyTotalUsageRate(storageFacility);

    var daysOfFeed = 0;
    if (dailyTotalUsageRateInTonnes > 0) {
      daysOfFeed = Math.floor(amountOfFeedInTonnes / dailyTotalUsageRateInTonnes);
    }

    return moment.utc(storageFacility.lastStocktake.recorded).add(daysOfFeed, 'days');
  }

  calculateLastStocktakeFeedWeightDryMatter(storageFacility: StorageFacility) {
    return this.calculateLastStocktakeFeedWeightAsFed(storageFacility) * (storageFacility.lastStocktake.dryMatter / 100);
  }

  calculateLastStocktakeFeedWeightAsFed(storageFacility: StorageFacility) {
      return (this.calculateLastStocktakeFeedVolume(storageFacility) * storageFacility.lastStocktake.unitWeight) / 1000;
  }

  calculateLastStocktakeFeedVolume(storageFacility: StorageFacility) {
    var level = storageFacility.lastStocktake.level;

    if (isNaN(level)) { // This occurs when user enters an invalid value in the UI
      level = 0;
    }

    switch (storageFacility.storageType.storageShape)
    {
        case "rectangle":
          if (storageFacility.storageType.levelMeasurementMethod === 'from back') {
            if (level > storageFacility.dimensions.length) {
              level = storageFacility.dimensions.length;
            }
            return storageFacility.dimensions.width * storageFacility.dimensions.height * level;
          }
          if (level > storageFacility.dimensions.height) {
            level = storageFacility.dimensions.height;
          }
          return storageFacility.dimensions.width * storageFacility.dimensions.length * level;
        case "cylinder":
            if (level > storageFacility.dimensions.height) {
              level = storageFacility.dimensions.height;
            }
            return level * Math.PI * Math.pow(storageFacility.dimensions.diameter / 2, 2);
        case "tube":
            if (level > storageFacility.dimensions.length) {
              level = storageFacility.dimensions.length;
            }
            return level * Math.PI * Math.pow(storageFacility.dimensions.diameter / 2, 2);
        case "bales":
            if (level > storageFacility.dimensions.bales) {
              level = storageFacility.dimensions.bales;
            }
            return level;
        case "coned cylinder":
            if (level > (storageFacility.dimensions.height)) {
              level = storageFacility.dimensions.height;
            }
            var coneVolume = 0.0;
            var cylinderVolume = 0.0;
            if (level > storageFacility.dimensions.coneHeight)
            {
                coneVolume = (storageFacility.dimensions.coneHeight * Math.PI * Math.pow(storageFacility.dimensions.diameter / 2, 2)) / 3;
                cylinderVolume = (level - storageFacility.dimensions.coneHeight) * Math.PI * Math.pow(storageFacility.dimensions.diameter / 2, 2);
            }
            else
            {
                coneVolume = (level * Math.PI * Math.pow(storageFacility.dimensions.diameter / 2, 2)) / 3;
            }
            return cylinderVolume + coneVolume;
        case "bags":
            if (level > storageFacility.dimensions.bags) {
              level = storageFacility.dimensions.bags;
            }
            return level;
        default:
            throw new Error('Specified storageShape is not recognised');
    }
  }

  calculateDailyTotalUsageRate(storageFacility: StorageFacility) {
    var consumed =
      this.calculateDailyUsageRatePerCow(storageFacility, 'milkers') +
      this.calculateDailyUsageRatePerCow(storageFacility, 'dry') +
      this.calculateDailyUsageRatePerCow(storageFacility, 'transition');

    return consumed / 1000; // turn into tonnes
  }

  calculateDailyTotalUsageRateSpecified(storageFacility: StorageFacility, type:string) {
    var consumed =
      this.calculateDailyUsageRatePerCow(storageFacility, 'milkers') +
      this.calculateDailyUsageRatePerCow(storageFacility, 'dry') +
      this.calculateDailyUsageRatePerCow(storageFacility, 'transition');

    consumed = consumed / 1000; // turn into tonnes

    if (this.feedRatesValue.quantifiedAs === 'dm') {
      if (type === 'dm') {
        return consumed; // dm
      } else {
        return consumed * (storageFacility.lastStocktake.dryMatter / 100); // dm to as fed
      }
    } else {
      if (type === 'as fed') {
        return consumed; // as fed
      } else {
        return consumed / (storageFacility.lastStocktake.dryMatter / 100); // as fed to dm
      }
    }
  }

  calculateDailyUsageRatePerCow(storageFacility: StorageFacility, cow:string) : number {
    var number = storageFacility.feedRates[cow].number || 0;
    var consumed = storageFacility.feedRates[cow].consumed || 0;
    var wastage = storageFacility.feedRates[cow].wastage || 0;
    var wastageQty = consumed * (wastage / 100);
    return number * (consumed + wastageQty);
  }

  getDefaultStorageImage() {
    return this.getStorageImageUri(this.storageFacilityValue);
  }

  getStorageImageUri(storageFacility: StorageFacility) {
    return 'assets/images/storage/' + storageFacility.storageType.imageTypeName + '/' + this.getStorageImageName(storageFacility.metrics.lastStocktakeFeedLevelPercentage.toString()) + '.png';
  }

  getStorageImageName(imageName:string) {
    if (imageName === 'default' || imageName === 'measure') {
      return imageName;
    }

    var level = Number(imageName);
    if(level === NaN){
      level = 0;
    }

    // if image is not default or measure, then it is a level: from 0 to 100 in 10 increments
    if (level > 100) {
      level = 100;
    }

    if (level < 0) {
      level = 0;
    }

    var rem = level % 10;
    var nearestLevel = Math.floor(level / 10) * 10;
    if (rem == 0) {
      return nearestLevel;
    } else {
      return nearestLevel + rem + (10 - rem);
    }
  }
}
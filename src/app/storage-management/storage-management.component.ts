import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FarmService } from '../_services/farm.service';
import { InventoryService } from '../_services/inventory.service';
import { LookupService } from '../_services/lookup.service';
import { Task, FeedTypesQuantifiedValues, StorageFacility } from '../_models/inventory.models';
import { FeedType } from '../_models/feedplan.models';
import * as _ from 'lodash';

@Component({
  selector: 'app-storage-management',
  templateUrl: './storage-management.component.html',
  styleUrls: ['./storage-management.component.sass']
})
export class StorageManagementComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();

  feedTypesQuantifiedValues: Array<FeedTypesQuantifiedValues> = [];

  _task: string;

  task: Task = new Task();
  
  
  //     name: '',
  //     step:'',
  //     steps: [],
  //     stepTitle:'',
  //     stepInstruction:'',
  //     stepIndex:0,
  //     farmId: '',
  //     storageFacilityId: '',
  //     storageTypeId: null,
  //     feedCategory: null,
  //     storageImage: null,
  //     feedRateQuantifiedAs: feedTypesQuantifiedValues[0],
  //     wetDensities: {
  //       hasValues: false,
  //       min: 0,
  //       max: 0,
  //       typical: 0
  //     }
  // };

  model: any;

  @Input() set setTask(_task: any) {
    this._task = _task;
  }

  constructor(
    public farm: FarmService,
    public inventory: InventoryService,
    public lookup: LookupService
  ) 
  {
    this.feedTypesQuantifiedValues.push({label: "Dry Matter", value: "dm"});
    this.feedTypesQuantifiedValues.push({label: "As Fed", value: "as fed"});
  }


  ngOnInit() {
    this.task.name = this._task;
    this.task.farmId = this.farm.farmValue.id;
    this.task.storageFacilityId = this.inventory.storageFacilityValue.id;

    this.configure();
    this[this.task.name]();
  }
  
    configure(){
      switch (this.task.name ) {
          case 'setup':
          {
            this.task.steps =  ['setDetails', 'setCapacity', 'setFeedType', 'setLevel', 'setFeedRate'];
            //onStorageFacilityChange = $scope.$watch('storageFacility', onStorageFacilityChange, true);
          } break;
          case 'stocktake':
          {
            this.task.steps =  ['setFeedType',  'setLevel', 'setFeedRate'];
            //onStorageFacilityChange = $scope.$watch('storageFacility', onStorageFacilityChange, true);
          } break;
          case 'delivery':
          {
            this.task.steps = ['setFeedType', 'setDelivery'];
            //onStorageFacilityChange = $scope.$watch('storageFacility', onStorageFacilityChange, true);
          } break;
          default: break;
      }
      this.task.step = this.task.steps[0];
    }

    // ACTIONS

    isFirstStep() {
      return this.task.step === this.task.steps[0];
    }

    isLastStep() {
      return this.task.step === this.task.steps[this.task.steps.length - 1];
    }

    isStepValid() {
      var formName = '';
      if (this.task.step === 'setCapacity') {
        formName = this.task.step + this.inventory.storageFacilityValue.storageType.storageShape.replace(/ /gi, '') + 'Form';
        //return vm[formName].$valid;
      } else if (this.task.step === 'setLevel') {
        formName = this.task.step + this.inventory.storageFacilityValue.storageType.levelMeasurementMethod.replace(/ /gi, '') + 'Form';
        //return vm[formName].$valid && this.inventory.stocktakeLevelIsWithinCapacity();
      } else if (this.task.step === 'setFeedType') {
        if (this.inventory.storageFacilityValue) { // Check if storage is loaded yet (releavnt to stocktake and delivery tasks)
          return this.inventory.storageFacilityValue.lastStocktake.feed !== null;
        }
        return false;
      } else {
        formName = this.task.step + 'Form';
        //return vm[formName].$valid;
      }
    }

    goBack(){
        this.task.stepIndex = this.task.stepIndex - 1;
        this.task.step = this.task.steps[this.task.stepIndex-1];
        this.task.isLastStep = this.task.steps.length == this.task.stepIndex + 1;
        this.task.isFirstStep = this.task.stepIndex == 0;
        this[this.task.step]();
    }

    goToNextStep(){
      this.task.step = this.task.steps[this.task.stepIndex];
      this.task.isLastStep = this.task.steps.length == this.task.stepIndex + 1;
      this.task.isFirstStep = this.task.stepIndex == 0;
      this.task.stepIndex++;
      this[this.task.step]();
    }

    feedTypesQuantifiedAsSelected() {
      this.task.feedRateQuantifiedAs = _.find(this.feedTypesQuantifiedValues, item => {return item.value == this.inventory.storageFacilityValue.feedRates.quantifiedAs;});
    }

    storageTypeSelected(){
      this.inventory.storageFacilityValue.storageType = _.find(this.lookup.storageTypesValue, storage => {  
        return storage.id == this.task.storageTypeId;
      });
      this.task.storageImage = this.inventory.getDefaultStorageImage();
    }

    onStorageFacilityChange() {
      if (this.inventory.storageFacilityValue){
        this.inventory.calculateMetrics(this.inventory.storageFacilityValue);

        if (this.task.step === 'setDetails' || this.task.step === 'setCapacity' || this.task.step === 'setFeedType') {
          if (this.inventory.storageFacilityValue.storageType) {
            this.task.storageImage = this.inventory.getDefaultStorageImage();
          }
        } else {
          this.task.storageImage = this.inventory.storageFacilityValue.metrics.lastStocktakeFeedLevelImage;
        }
      }
    }

    feedCategorySelected(category) {
        this.task.feedCategory = category;
    }

    feedTypeSelected(feed: FeedType) {
      if (this.task.name === 'delivery') {
        this.inventory.storageFacilityValue.lastDelivery.feed = feed;
      } else {
        this.inventory.storageFacilityValue.lastStocktake.feed = feed;
      }
    }

    close(){
        this.closeModal.emit(true);
    }

    save(){


        //let model: any;

        // switch(this.task.name){
        //     case 'setup':
        //     {
        //         //model = new StorageFacility();
        //         model.storageTypeId = storageFacility.storageType.id;
        //         model.name = storageFacility.name;
        //         model.width = storageFacility.dimensions.width;
        //         model.height = storageFacility.dimensions.height;
        //         model.length = storageFacility.dimensions.length;
        //         model.diameter = storageFacility.dimensions.diameter;
        //         model.coneHeight = storageFacility.dimensions.coneHeight;
        //         model.bags = storageFacility.dimensions.bags;
        //         model.bales = storageFacility.dimensions.bales;
        //         model.level = storageFacility.lastStocktake.level;
        //         model.feedId = storageFacility.lastStocktake.feed.id;
        //         model.unitWeight = storageFacility.lastStocktake.unitWeight;
        //         model.unitValue = storageFacility.lastStocktake.unitValue;
        //         model.dryMatter = storageFacility.lastStocktake.dryMatter;
        //         model.feedRateQuantifiedAs = storageFacility.feedRates.quantifiedAs;
        //         model.milkersNumber = storageFacility.feedRates.milkers.number;
        //         model.milkersConsumed = storageFacility.feedRates.milkers.consumed;
        //         model.milkersWastage = storageFacility.feedRates.milkers.wastage;
        //         model.dryNumber = storageFacility.feedRates.dry.number;
        //         model.dryConsumed = storageFacility.feedRates.dry.consumed;
        //         model.dryWastage = storageFacility.feedRates.dry.wastage;
        //         model.transitionNumber = storageFacility.feedRates.transition.number;
        //         model.transitionConsumed = storageFacility.feedRates.transition.consumed;
        //         model.transitionWastage = storageFacility.feedRates.transition.wastage;

        //         // return this.inventory.addStorageFacility(this.task.farmId, model).then(
        //         //     function(response){
        //         //         $modalInstance.close(response);
        //         //     },
        //         //     function(failure){console.error(failure);}
        //         // );
        //     }
        //     break;
        //     case 'delivery':
        //     {
        //         model.feedId = storageFacility.lastDelivery.feed.id;
        //         model.productName = storageFacility.lastDelivery.productName;
        //         model.quantity = storageFacility.lastDelivery.quantity;
        //         model.unitWeight = storageFacility.lastDelivery.unitWeight;

        //         return inventoryService.recordStorageFacilityDelivery(task.farmId, task.storageFacilityId, model).then(
        //             function(delivery){
        //                 $modalInstance.close(delivery);
        //             },
        //             function(failure){console.error(failure);}
        //         );
        //     }
        //     break;
        //     case 'stocktake':
        //     {
        //         model.level = storageFacility.lastStocktake.level;
        //         model.feedId = storageFacility.lastStocktake.feed.id;
        //         model.unitWeight = storageFacility.lastStocktake.unitWeight;
        //         model.unitValue = storageFacility.lastStocktake.unitValue;
        //         model.dryMatter = storageFacility.lastStocktake.dryMatter;

        //         return inventoryService.recordStorageFacilityStocktake(task.farmId, task.storageFacilityId, model).then(
        //             function(stocktake){
        //                 $modalInstance.close(stocktake);
        //             },
        //             function(failure){console.error(failure);}
        //         );
        //     }
        //     break;
        //     default:break;
        // }
    }

    // TASKS
    setup(){
        console.info('task:setup');

        this.task.stepTitle = 'Storage Facility';

        // load data
        this.inventory.newStorageFacility();
    }

    stocktake(){

        console.info('task:stocktake');

        this.task.stepTitle = 'Stocktake';

        // load data
        this.inventory.getStorageFacility(this.farm.farmValue.id, this.task.storageFacilityId);

        // var promises = [
        //   loadStorageTypes(),
        //   loadStorageFacility(task.farmId, task.storageFacilityId)
        // ];
        // return $q.all(promises).then(
        //     function(response) {
        //       var lastStocktakeFeed = storageFacility.lastStocktake.feed;
        //       storageFacility.setLastStocktake({
        //         recorded: moment().toISOString(),
        //         level: 0,
        //         dryMatter: 0,
        //         unitWeight: 0,
        //         unitValue: 0,
        //         feed: lastStocktakeFeed
        //       });
        //       goToNextStep();
        //     },
        //     function(failure){
        //         console.error(failure);
        //     }
        // );
    }

    delivery(){
        console.info('task:delivery');
        this.task.stepTitle = 'Delivery';

        // load data
        // var promises = [
        //     loadStorageFacility(task.farmId, task.storageFacilityId)
        // ];
        // return $q.all(promises).then(
        //     function(response) {
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
        //     function(failure){
        //         console.error(failure);
        //     }
        // );
    }

        // STEPS
        setDetails(){
            console.info('step:setDetails');
            this.task.stepInstruction = 'Choose a feed storage type and enter the name or description of the facility.';
        }

        setCapacity(){
            console.info('step:setCapacity');
            this.task.stepInstruction = 'Enter the capacity of the storage facility.';
        }

        setFeedType(){
            console.info('step:setFeedType');
            this.task.stepInstruction = 'Select the type of feed to be stored in the storage facility.';

            // this.task.storageImage = storageFacility.getDefaultStorageImage();

            // var promises = [loadFeeds()];
            // return $q.all(promises).then(
            //     function(response) {
            //         console.info('feeds loaded', response);
            //     },
            //     function(failure){
            //         console.error(failure);
            //     }
            // );
        }

        setFeedRate(){
            console.info('step:setFeedRate');
            this.task.stepInstruction = 'Enter the amount consumed and wasted for each animal type.';
        }

        setLevel(){
            console.info('step:setLevel');
            this.task.stepInstruction = 'Enter the current amount of the feed stored in the facility.';

            // this.task.storageImage = storageFacility.metrics.lastStocktakeFeedLevelImage;

            // var feed = _.find(feeds, function(item) {
            //   return item.id === storageFacility.lastStocktake.feed.id;
            // });

            // if ((storageFacility.storageType.storageShape !== 'bags' && storageFacility.storageType.storageShape !== 'bales') &&
            //   (feed.typicalWetDensity !== null && feed.minWetDensity !== null && feed.maxWetDensity !== null)) {
            //     this.task.wetDensities.hasValues = true;
            //   this.task.wetDensities.min = feed.minWetDensity;
            //   this.task.wetDensities.max = feed.maxWetDensity;
            //   this.task.wetDensities.typical = feed.typicalWetDensity;

            //   storageFacility.lastStocktake.unitWeight = feed.typicalWetDensity;
            // }
            // storageFacility.lastStocktake.dryMatter = feed.dm / 10;
        }

        setDelivery (){
            console.info('step:setDelivery');
            this.task.stepInstruction = 'Enter the details of the delivery.';
        }

        // function sortFeedResults(data){
        //     for (var index = 0; index < data.length; index++) {
        //         feeds.push(data[index]);
        //         feedCategories.push(data[index].category);
        //     }

        //     var feedCategories = _.uniq(feedCategories);

        //     feedCategories = _.sortBy(feedCategories, function (element){
        //         var rank = {
        //             'Pastures':1,
        //             'Other grazed forages':2,
        //             'Silages':3,
        //             'Hays':4,
        //             'Grains and concentrates':5,
        //             'Minerals and additives':6,
        //             'By products including straws':7
        //         };

        //         return rank[element];
        //     });

        //     if (task.feedCategory === null) {
        //       task.feedCategory = feedCategories[0];
        //     }
        //     return feeds;
        // }

}

import { Injectable } from '@angular/core';
import { Feedplan, HerdBooleans, HerdNumbers, StockDetails, FeedType, HerdCost, HerdNutrition } from '../_models/feedplan.models';
import { Date, MonthDisplay } from '../_models/shared.models';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { FeedplanBackendService } from './feedplan.backend';
import { AlertService } from './alert.service';
import * as _ from 'lodash';
import { FeedCalculatorService } from './feed.calculator';
import { DietCalculatorService } from './diet.calculator';
import { Diet, GrazableForage, Cost, Nutrition, Consumption, FeedConsumed, FeedCalculation, ConsumptionCalculation, DietRequirements, DietNutrition } from '../_models/diet.models';
import { FarmService } from './farm.service';

@Injectable({
  providedIn: 'root'
})

export class FeedplanService {

  static feedCalculator: FeedCalculatorService = new FeedCalculatorService();
  static dietCalculator: DietCalculatorService = new DietCalculatorService();

  feedplan: Observable<Feedplan>;
  private _feedplan: BehaviorSubject<Feedplan>;

  private dataStore: {
    feedplan: Feedplan
  };

  constructor(
    private feedplanBackend: FeedplanBackendService,
    private alertService: AlertService
  ) {
    console.log('FeedplanService:Constructor');

    this.dataStore = { feedplan: new Feedplan() };

    this._feedplan = <BehaviorSubject<Feedplan>>new BehaviorSubject(new Feedplan());
    this.feedplan = this._feedplan.asObservable();

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.farm.id) {
      this.loadFeedplan(currentUser.farm.id);
    }
  }

  public get feedplanValue(): Feedplan {
    return this._feedplan.value;
  }

  public set feedplanValue(feedplan: Feedplan) {
    this._feedplan = new BehaviorSubject<Feedplan>(feedplan);
    this.feedplan = this._feedplan.asObservable();
  }

  loadFeedplan(farmid: string) {
    if (farmid === undefined) return;
    console.log(`Feedplan Service: loadFeedplan(${farmid})`);
    this.feedplanBackend.get(farmid).subscribe(
      data => {
        this.dataStore.feedplan = new Feedplan(data);
        this._feedplan.next(Object.assign(new Feedplan(), this.dataStore).feedplan);
        this.initialise();
        this.validate();
      },
      error => this.alertService.handleError(error)
    );
  }

  updateFeedPlan(
    farmid: string,
    feedplanid: string,
    feedplan: Feedplan
  ) {
    this.feedplanBackend.update(farmid, feedplanid, feedplan)
      .subscribe(data => {
        this.dataStore.feedplan = new Feedplan(data);
        this._feedplan.next(Object.assign({}, this.dataStore).feedplan);
      },
        error => {
          this.alertService.handleError(error);
        });
  }

  createNewFeedPlan(
    farmid: string,
    startMonth: MonthDisplay,
    cows: HerdBooleans) {
    const feedplan = Feedplan.create(farmid, startMonth, cows);

    this.dataStore.feedplan = feedplan;
    this._feedplan.next(Object.assign({}, this.dataStore).feedplan);

    this.validate();
    this.saveFeedPlan();
  }

  addStockDetails(
    copy: boolean,
    firstMonth: MonthDisplay
  ) {

    var newStockDetails: StockDetails;

    if (copy) {
      newStockDetails = _.cloneDeep(this.feedplanValue.scenario.stockDetails[this.feedplanValue.scenario.stockDetails.length - 1]);
    }
    else {
      newStockDetails = new StockDetails();
    }

    if (firstMonth) {
      newStockDetails.month = firstMonth.text;
    }

    this.feedplanValue.scenario.stockDetails.push(newStockDetails);
  }

  saveFeedPlan() {
    if (!this.feedplanValue.feedPlanId) {
      this.feedplanBackend
        .create(this.feedplanValue.farmId, this.feedplanValue)
        .subscribe(data => {
          this.dataStore.feedplan = new Feedplan(data);
          this._feedplan.next(Object.assign({}, this.dataStore).feedplan);
        },
          error => {
            this.alertService.handleError(error);
          });
    }
    else {
      this.feedplanBackend
        .update(this.feedplanValue.farmId, this.feedplanValue.feedPlanId, this.feedplanValue)
        .subscribe(data => {
          this.dataStore.feedplan = data;
          this._feedplan.next(Object.assign({}, this.dataStore).feedplan);
        },
          error => {
            this.alertService.handleError(error);
          });
    }
  }

  initialiseFeeds() {
    this.feedplanValue.scenario.feedTypes.forEach(feedType => {
      this.initialiseFeedType(feedType);
    });
  }

  initialiseFeedType(feedType: FeedType) {

    feedType.feedDescription = feedType.feedDescription || '';
    feedType.marketPrice = feedType.marketPrice || 0;
    feedType.asFedOrDM = feedType.asFedOrDM || 'dm';
    feedType.feedingArea = feedType.feedingArea || '';
    feedType.cows = feedType.cows ? feedType.cows : new HerdBooleans();
    feedType.nutrition = FeedplanService.feedCalculator.feedNutrition(feedType);
    feedType.cost = FeedplanService.feedCalculator.feedCost(feedType);

    return feedType;
  }

  initialiseDiet() {

    // SETUP A DIET FOR EACH STOCK TYPE
    let stockDetails = this.feedplanValue.scenario.stockDetails;
    let feedTypes = this.feedplanValue.scenario.feedTypes;
    let cows = this.feedplanValue.scenario.cows;
    stockDetails.forEach(stock => {

      stock.diet = stock.diet || new Array<Diet>();
      for (let feedType_index = 0; feedType_index < feedTypes.length; feedType_index++) {

        stock.diet[feedType_index] = stock.diet[feedType_index] || new Diet();
        // because feed types get sorted to display pasture first, attach original index to feed type;
        feedTypes[feedType_index].index = feedType_index;
        stock.diet[feedType_index].grazableForage = stock.diet[feedType_index].grazableForage || Object.assign(new GrazableForage(), {
          growthRate: 0,
          hectare: 0,
          utilisation: 0,
          available: 0,
          customRate: false
        });

        // public checkIsValid() {
        //   this.isValid = this.growthRate > 0 && this.hectare > 0 && this.utilisation > 0 && this.available > 0;
        // }

        stock.diet[feedType_index].grazableForage.isValid =
          stock.diet[feedType_index].grazableForage.growthRate > 0 &&
          stock.diet[feedType_index].grazableForage.hectare > 0 &&
          stock.diet[feedType_index].grazableForage.utilisation > 0 &&
          stock.diet[feedType_index].grazableForage.available >= 0;

        if (cows.milkers) {
          if (!stock.diet[feedType_index].milkers) {
            stock.diet[feedType_index].milkers = new Consumption();
            stock.diet[feedType_index].milkers.calc = new ConsumptionCalculation();
          } else stock.diet[feedType_index].milkers = stock.diet[feedType_index].milkers;
        } else {
          stock.diet[feedType_index].milkers = new Consumption();
          stock.diet[feedType_index].milkers.calc = new ConsumptionCalculation();
        }

        if (cows.dry) {
          if (!stock.diet[feedType_index].dry) {
            stock.diet[feedType_index].dry = new Consumption();
            stock.diet[feedType_index].dry.calc = new ConsumptionCalculation();
          } else stock.diet[feedType_index].dry = stock.diet[feedType_index].dry;

        } else {
          stock.diet[feedType_index].dry = new Consumption();
          stock.diet[feedType_index].dry.calc = new ConsumptionCalculation();
        }

        if (cows.transition) {
          if (!stock.diet[feedType_index].transition) {
            stock.diet[feedType_index].transition = new Consumption();
            stock.diet[feedType_index].transition.calc = new ConsumptionCalculation();
          } else stock.diet[feedType_index].transition = stock.diet[feedType_index].transition;
        } else {
          stock.diet[feedType_index].transition = new Consumption();
          stock.diet[feedType_index].transition.calc = new ConsumptionCalculation();
        }
      }
      if (!stock.dietValidation) {
        stock.dietValidation = new HerdBooleans();
      }
    });
  }

  removeStockDetails() {
    this.feedplanValue.scenario.stockDetails.pop();
  }

  updateFeedingInstructions() {

  }

  addFeedType(feedType: FeedType) {
    ///TODO_4UI : 
    feedType.cost = FeedplanService.feedCalculator.feedCost(feedType);

    ///TODO_4UI_2019-4-10 : 
    feedType.nutrition = FeedplanService.feedCalculator.feedNutrition(feedType);

    this.feedplanValue.scenario.feedTypes.push(feedType);
    for (let index = 0; index < this.feedplanValue.scenario.feedTypes.length; index++) {

      ///TODO_4UI_2019-4-10 : // for use in Line 426 : feedCalc.feedType.index
      this.feedplanValue.scenario.feedTypes[index].index = index;

      this.feedplanValue.scenario.feedTypes[index].active = false;
      if (!this.feedplanValue.scenario.feedTypes[index].cows) {
        this.feedplanValue.scenario.feedTypes[index].cows = new HerdBooleans();
      }
    }

    this.feedplanValue.scenario.feedTypes[this.feedplanValue.scenario.feedTypes.length - 1].active = true;

    this.feedplanValue.scenario.stockDetails.forEach(stock => {
      for (let index = 0; index < this.feedplanValue.scenario.feedTypes.length; index++) {
        let diet = stock.diet[index];
        if (!diet) {
          stock.diet[index] = new Diet();
        } else {
          stock.diet[index] = new Diet(stock.diet[index]);
        }
      }
    });
  }

  getFeedTypeDetails(feedTypeIndex: number) {
    return {
      dm: this.feedplanValue.scenario.feedTypes[feedTypeIndex].dm,
      me: this.feedplanValue.scenario.feedTypes[feedTypeIndex].me,
      cp: this.feedplanValue.scenario.feedTypes[feedTypeIndex].cp,
      ndf: this.feedplanValue.scenario.feedTypes[feedTypeIndex].ndf
    };
  }

  updateFeedTypeDetails(feedTypeDetails: FeedType) {
    this.feedplanValue.scenario.feedTypes[feedTypeDetails.index].dm = feedTypeDetails.dm * 10;
    this.feedplanValue.scenario.feedTypes[feedTypeDetails.index].me = feedTypeDetails.me;
    this.feedplanValue.scenario.feedTypes[feedTypeDetails.index].cp = feedTypeDetails.cp;
    this.feedplanValue.scenario.feedTypes[feedTypeDetails.index].ndf = feedTypeDetails.ndf;
  }

  updateGrazableForage(
    stockIndex: number,
    dietIndex: number,
    grazableForage: GrazableForage) {
    this.dataStore.feedplan.scenario.stockDetails[stockIndex].diet[dietIndex].grazableForage = grazableForage;
    this._feedplan.next(Object.assign({}, this.dataStore).feedplan);
  }

  removeFeedType(feedTypeIndex: number) {
    this.feedplanValue.scenario.feedTypes.splice(feedTypeIndex, 1);
    for (let x = 0; x < this.feedplanValue.scenario.stockDetails.length; x++) {
      if (this.feedplanValue.scenario.stockDetails[x].diet != undefined) {
        this.feedplanValue.scenario.stockDetails[x].diet.splice(feedTypeIndex, 1);
      }
    }
  }

  initialise() {
    this.initialiseFeeds();
    this.initialiseDiet();
    this.validate();
  }

  validate() {
    this.validateStock();
    this.validateFeed();
    this.validateDiet();
  }

  private validateStock() {
    let stockIsValid = true;
    this.feedplanValue.scenario.stockDetails.forEach((stock: StockDetails) => {
      stock.valid = true;
      if (this.feedplanValue.scenario.cows.milkers &&
        (stock.numberOfAnimals.milkers === 0 ||
          stock.averageLiveWeight.milkers === 0 ||
          stock.liveweightChange.milkers < -2 ||
          stock.liveweightChange.milkers > 2 ||
          stock.averageDistanceWalkedPerDay.milkers === 0 ||
          stock.averageDaysInMilk === 0 ||
          stock.averageMilkYield === 0 ||
          stock.milkFat === 0 ||
          stock.milkProtein === 0)) {
        stock.valid = false;
      }
      if (this.feedplanValue.scenario.cows.dry &&
        (stock.numberOfAnimals.dry === 0 ||
          stock.averageLiveWeight.dry === 0 ||
          stock.liveweightChange.dry < -2 ||
          stock.liveweightChange.dry > 2 ||
          stock.averageDistanceWalkedPerDay.dry === 0)) {
        stock.valid = false;
      }
      if (this.feedplanValue.scenario.cows.transition &&
        (stock.numberOfAnimals.transition === 0 ||
          stock.averageLiveWeight.transition === 0 ||
          stock.liveweightChange.transition < -2 ||
          stock.liveweightChange.transition > 2 ||
          stock.averageDistanceWalkedPerDay.transition === 0)) {
        stock.valid = false;
      }

      if (!stock.valid) {
        stockIsValid = false;
      }
    });

    this.feedplanValue.scenario.valid[0] = stockIsValid;
  }

  private validateFeed() {
    let feedIsValid = true;
    if (this.feedplanValue.scenario.feedTypes.length === 0) feedIsValid = false;
    for (let index = 0; index < this.feedplanValue.scenario.feedTypes.length; index++) {
      let feedType = this.feedplanValue.scenario.feedTypes[index];
      let cowTypesSelected = feedType.cows.milkers || feedType.cows.dry || feedType.cows.transition;
      feedType.valid = feedType.marketPrice > 0 && cowTypesSelected && feedType.feedingArea !== "";
      if (!feedType.valid) feedIsValid = false;
    }
    this.feedplanValue.scenario.valid[1] = feedIsValid;
  }

  private validateDiet() {

    // validate
    let validFeedplanMonth = true;

    // iterate
    this.feedplanValue.scenario.stockDetails.forEach(stock => {

      // validate
      let validAnimalType = true;
      let validFeedConfiguration = true;

      // iterate
      ["milkers", "transition", "dry"].forEach(cowType => {

        if (cowType) {
          if (stock.diet.map(d => d[cowType]).length === 0) {
            validAnimalType = false;
          }
        }

        // validate
        let validFeedType = true;
        let dietFeedIndex = 0;
        let dietdmTotal = 0;

        let feedCalculations: Array<FeedCalculation> = new Array<FeedCalculation>();

        // iterate
        this.feedplanValue.scenario.feedTypes.forEach(feedType => {

          let feedCalculation = new FeedCalculation();

          if (feedType.cows[cowType]) {
            feedCalculation.feedType = FeedplanService.feedCalculator.feedWithConstants(feedType);
            let feedAmount = stock.diet[dietFeedIndex][cowType];
            let feedConsumption = FeedplanService.feedCalculator.feedConsumption(feedCalculation.feedType, feedAmount);
            feedCalculation.feedConsumed = FeedplanService.feedCalculator.feedSupplied(feedConsumption, feedAmount);
          }

          feedCalculations[dietFeedIndex] = feedCalculation;
          dietFeedIndex++;
        });

        dietdmTotal = feedCalculations.reduce((total, diet) => {
          return total + diet.feedConsumed.dm;
        }, 0);

        feedCalculations.forEach(feedCalc => {

          let validFeedUsage = true;
          let stockNumbers = 0;

          if (feedCalc.feedType.category === "Pastures") {
            var forageFeedType = this.feedplanValue.scenario.feedTypes[feedCalc.feedType.index];
            var pastureType = stock.diet[feedCalc.feedType.index];

            if (forageFeedType.cows.milkers) {
              stockNumbers += stock.numberOfAnimals.milkers;
            }
            if (forageFeedType.cows.dry) {
              stockNumbers += stock.numberOfAnimals.dry;
            }
            if (forageFeedType.cows.transition) {
              stockNumbers += stock.numberOfAnimals.transition;
            }

            let validFeedAvailability = FeedplanService.feedCalculator.feedAvailability(feedCalc, pastureType.grazableForage, stockNumbers)
            if (validFeedUsage && !validFeedAvailability.validUsage) {
              validFeedUsage = false;
            }
            if (validFeedConfiguration && !validFeedAvailability.validSetup) {
              validFeedConfiguration = false;
            }
          }
          else if (feedCalc.feedType.category !== 'Pastures' && feedCalc.feedType.category !== 'Other grazed forages') {
            if (feedCalc.feedConsumed.dm > 0 && dietdmTotal > 0) {
              if (feedCalc.feedType.maxFeedingRate > 0 && ((feedCalc.feedConsumed.dm / dietdmTotal) * 100 > feedCalc.feedType.maxFeedingRate)) {
                feedCalc.feedConsumed.rateExceeded = true;
                feedCalc.feedConsumed.warning = feedCalc.feedType.comment;
                validFeedUsage = false;
              }
            }
          }

          for (let index = 0; index < feedCalculations.length; index++) {
            stock.diet[index][cowType].calc = feedCalculations[index].feedConsumed;
          }

          let dietRequirements: DietRequirements = FeedplanService.dietCalculator.dietRequirements(stock, feedCalculations.map(fc => fc.feedType), cowType);
          if (stock.dietCost) stock.dietCost[cowType] = FeedplanService.dietCalculator.dietCost(stock, feedCalculations, cowType);
          else {
            stock.dietCost = new HerdCost();
            stock.dietCost[cowType] = FeedplanService.dietCalculator.dietCost(stock, feedCalculations, cowType);
          }
          if (stock.dietNutrition) {
            stock.dietNutrition[cowType] = FeedplanService.dietCalculator.dietNutrition(feedCalculations, dietRequirements, cowType);
          }
          else {
            stock.dietNutrition = new HerdNutrition();
            stock.dietNutrition[cowType] = FeedplanService.dietCalculator.dietNutrition(feedCalculations, dietRequirements, cowType);
          }

          if (stock.numberOfAnimals[cowType] > 0 && (!validFeedType || !stock.dietNutrition[cowType].dietValid)) validAnimalType = false;

        });
        stock.dietValidation[cowType] = validAnimalType;

      });
      if (!validAnimalType) validFeedplanMonth = false;

    });

    this.feedplanValue.scenario.valid[2] = validFeedplanMonth;
  }
}
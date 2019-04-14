import { Date, MonthDisplay, MonthLookup } from './shared.models';
import { Diet, Nutrition, Cost, FeedCalculation, FeedConsumed, Consumption, ConsumptionCalculation, GrazableForage, DietRequirements } from './diet.models';
import * as _ from 'lodash';
import { FeedCalculatorService } from '../_services/feed.calculator';
import { DietCalculatorService } from '../_services/diet.calculator';
import { MonthService } from '../_services/month.service';
import { validateVerticalPosition } from '@angular/cdk/overlay';

export class Feedplan {

    feedPlanId: string = null;
    farmId: string = null;
    scenario: Scenario = null;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.feedPlanId = instanceData.feedPlanId;
        this.farmId = instanceData.farmId;
        this.scenario = new Scenario(instanceData.scenario);
    }

    public static create(farmId: string, date: MonthDisplay, animals: HerdBooleans) : Feedplan {
        
        let feedplan = new Feedplan();
        feedplan.farmId = farmId;
        
        feedplan.setupNewScenario(date, animals);
        feedplan.setupNewStockDetails();
        feedplan.setupNewFeedTypes();

        return feedplan;
    }

    setupNewScenario(date: MonthDisplay, animals: HerdBooleans) {
        this.scenario = new Scenario();
        this.scenario.cows = animals;
        this.scenario.date = date;

        if (this.scenario.stockDetails.length == 0) {
          this.scenario.name = 'New Feed Plan';
        }
        else if (this.scenario.stockDetails.length > 1) {
          this.scenario.name = 'Feed plan for ' + this.scenario.stockDetails[0].month + ' to ' + this.scenario.stockDetails[this.scenario.stockDetails.length - 1].month;
        }
        else {
          this.scenario.name = 'Feed plan for ' + this.scenario.stockDetails[0].month;
        }
    }

    setupNewStockDetails() {
        let newStockDetails = new StockDetails();
        newStockDetails.month = this.scenario.date.text;
        newStockDetails.date = this.scenario.date;
        newStockDetails.valid = false;
        newStockDetails.activeDiet = true;
        newStockDetails.activeStockDetails = true;

        this.scenario.stockDetails = new Array<StockDetails>();
        this.scenario.stockDetails.push(newStockDetails);
    }

    setupNewFeedTypes() {
        this.scenario.feedTypes = new Array<FeedType>();
    }
}

export class Scenario {
    
    private monthList = new MonthService();

    name: string = null;
    cows: HerdBooleans = new HerdBooleans();
    date: MonthDisplay = new MonthDisplay();
    valid: boolean[] = [false, false, false];
    feedTypes: FeedType[] = [];
    stockDetails: StockDetails[] = [];
    
    setStockDetails(stockDetails: StockDetails[]) {
        if(stockDetails)
        this.stockDetails = stockDetails.map(stockDetail => new StockDetails(stockDetail));
    }

    setFeedTypes(feedTypes: FeedType[]) {
        if(feedTypes) 
        {
            let index = 0;
            this.feedTypes = feedTypes.map(feedType => {
                let ft = new FeedType(feedType);
                ft.index = index;
                index++;
                return ft;
            });
        }
    }

    public setDiet(){
        this.stockDetails.forEach(stock => {
            for(let index = 0; index < this.feedTypes.length; index++) {
                let diet = stock.diet[index];
                if(!diet) {
                    stock.diet[index] = new Diet();
                } else {
                    stock.diet[index] = new Diet(stock.diet[index]);
                }
            }
        });
    }

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.name = instanceData.name;
        this.cows = new HerdBooleans(instanceData.cows);
        this.date.text = `${this.monthList.nameForIndex(instanceData.date.month)} ${instanceData.date.year}`;
        this.setFeedTypes(instanceData.feedTypes);
        this.setStockDetails(instanceData.stockDetails);
        this.setDiet();
    }
}

export class StockDetails { 

    private monthList = new MonthService();

    activeDiet: boolean = false;
    activeStockDetails: boolean = false;
    averageDaysInMilk: number = 0;
    averageDaysPregnant: number = 0;
    averageMilkYield: number = 0;
    centsLitre: number = 0;
    milkFat: number = 0;
    milkFatPrice: number = 0;
    milkProtein: number = 0;
    milkProteinPrice: number = 0;
    milkPrice: boolean = true;
    proteinPrice: boolean = false;
    month: string = null;
    valid:boolean = false;
    averageDistanceWalkedPerDay: HerdNumbers = new HerdNumbers();
    averageLiveWeight: HerdNumbers = new HerdNumbers();
    diet: Array<Diet> = [];
    dietValidation: HerdBooleans = new HerdBooleans();
    feedInstructionNames: HerdTexts = new HerdTexts();
    liveweightChange: HerdNumbers = new HerdNumbers();
    numberOfAnimals: HerdNumbers = new HerdNumbers();
    terrain: HerdNumbers = new HerdNumbers();
    dietCost: HerdCost = new HerdCost();
    dietNutrition: HerdNutrition = new HerdNutrition();
    date: MonthDisplay = new MonthDisplay();

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.activeDiet = instanceData.activeDiet;
        this.activeStockDetails = instanceData.activeStockDetails;
        this.averageDaysInMilk = instanceData.averageDaysInMilk;
        this.averageDaysPregnant = instanceData.averageDaysPregnant;
        this.averageMilkYield = instanceData.averageMilkYield;
        this.centsLitre = instanceData.centsLitre;
        this.milkFat = instanceData.milkFat;
        this.milkFatPrice = instanceData.milkFatPrice;
        this.milkProtein = instanceData.milkProtein;
        this.milkPrice = instanceData.milkPrice;
        this.proteinPrice = instanceData.proteinPrice;
        this.month = instanceData.month;
        this.valid = instanceData.valid;
        this.averageDistanceWalkedPerDay = new HerdNumbers(instanceData.averageDistanceWalkedPerDay);
        this.averageLiveWeight = new HerdNumbers(instanceData.averageLiveWeight);
        this.dietValidation = new HerdBooleans(instanceData.dietValidation);
        this.feedInstructionNames = new HerdTexts(instanceData.feedInstructionNames)
        this.liveweightChange = new HerdNumbers(instanceData.liveweightChange);
        this.numberOfAnimals = new HerdNumbers(instanceData.numberOfAnimals);
        this.terrain = new HerdNumbers(instanceData.terrain);
        this.date = this.monthList.dateForMonth(instanceData.month);
        this.dietCost = new HerdCost(instanceData.dietCost);
        this.dietNutrition = new HerdNutrition(instanceData.dietNutrition);
        this.diet = instanceData.diet.map((item: any) => new Diet(item));
    }
}

export class FeedType {

    private feedCalculator = new FeedCalculatorService();
    private dietCalculator = new DietCalculatorService();

    id: string = null;
    name: string = null;
    category: string = null;
    type: string = null;
    feedCode: string = null;
    wetDensity: number = 0;
    typicalWetDensity: number = 0;
    minWetDensity: number = 0;
    maxWetDensity: number = 0;
    maxFeedingRate: number = 0;
    comment: string = null;
    dm: number = 0;
    me: number = 0;
    cp: number = 0;
    ndf: number = 0;
    starch: number = 0;
    an: number = 0;
    bn: number = 0;
    cn: number = 0;
    ee: number = 0;
    adin: number = 0;
    active: boolean = false;
    feedingArea: string = null;
    feedDescription: string = null;
    marketPrice: number = 0;
    asFedOrDM: string = "dm";
    index: number = 0; 
    valid: boolean = false; 
    cows: HerdBooleans = new HerdBooleans();
    nutrition: Nutrition = new Nutrition();
    cost: Cost = new Cost();

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {

        this.id = instanceData.id;
        this.name = instanceData.name;
        this.category = instanceData.category;
        this.type = instanceData.type;
        this.feedCode = instanceData.feedCode;
        this.wetDensity = instanceData.wetDensity;
        this.typicalWetDensity = instanceData.typicalWetDensity;
        this.minWetDensity = instanceData.minWetDensity;
        this.maxWetDensity = instanceData.maxWetDensity;
        this.maxFeedingRate = instanceData.maxFeedingRate;
        this.comment = instanceData.comment;
        this.dm = instanceData.dm;
        this.me = instanceData.me;
        this.cp = instanceData.cp;
        this.ndf = instanceData.ndf;
        this.starch = instanceData.starch;
        this.an = instanceData.an;
        this.bn = instanceData.bn;
        this.cn = instanceData.cn;
        this.ee = instanceData.ee;
        this.adin = instanceData.adin;
        this.active = instanceData.active;
        this.feedingArea = instanceData.feedingArea;
        this.feedDescription = instanceData.feedDescription;
        this.marketPrice = instanceData.marketPrice;
        this.asFedOrDM = instanceData.asFedOrDM;
        this.index = instanceData.index;
        this.valid = instanceData.valid;
        this.cows = new HerdBooleans(instanceData.cows);
        this.nutrition = this.feedCalculator.feedNutrition(this);
        this.cost = this.feedCalculator.feedCost(this);
    }
}

export class HerdBooleans {

    dry: boolean = false;
    milkers: boolean = false;
    transition: boolean = false;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.dry = instanceData.dry;
        this.milkers = instanceData.milkers;
        this.transition = instanceData.transition;
    }
}

export class HerdNumbers {

    dry: number = 0;
    milkers: number = 0;
    transition: number = 0;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.dry = instanceData.dry;
        this.milkers = instanceData.milkers;
        this.transition = instanceData.transition;
    }
}

export class HerdTexts {

    dry: string = null;
    milkers: string = null;
    transition: string = null;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.dry = instanceData.dry;
        this.milkers = instanceData.milkers;
        this.transition = instanceData.transition;
    }
}

export class HerdCost {

    dry: Cost = new Cost();
    milkers: Cost = new Cost();
    transition: Cost = new Cost();
    
    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.dry = instanceData.dry;
        this.milkers = instanceData.milkers;
        this.transition = instanceData.transition;
    }
}

export class HerdNutrition {
    
    dry: Nutrition = new Nutrition();
    milkers: Nutrition = new Nutrition();
    transition: Nutrition = new Nutrition();
    
    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.dry = instanceData.dry;
        this.milkers = instanceData.milkers;
        this.transition = instanceData.transition;
    }
}

export class FeedAvailabilityValidation {

    validSetup: boolean = false;
    validUsage: boolean = false;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.validSetup = instanceData.validSetup;
        this.validUsage = instanceData.validUsage;
    }
}
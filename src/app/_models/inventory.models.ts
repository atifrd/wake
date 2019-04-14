import { NumberSymbol } from '@angular/common';

export class StorageType {

    id: string = null;
    name: string = null;
    storageShape: string = null;
    imageTypeName: string = null;
    capacityUnitType: string = null;
    levelMeasurementMethod: string = null;
    categories: string[] = [];

    constructor(instanceData?: any) {
        if (instanceData) {
            this.id = instanceData.id;
            this.name = instanceData.name;
            this.storageShape = instanceData.storageShape;
            this.imageTypeName = instanceData.imageTypeName;
            this.capacityUnitType = instanceData.capacityUnitType;
            this.levelMeasurementMethod = instanceData.levelMeasurementMethod;
            this.categories = instanceData.categories;
        }
    }
}

export class StorageFacility {

    id: string = null;
    name: string = null;
    metrics: StorageMetrics = new StorageMetrics();
    dimensions: StorageDimensions = new StorageDimensions();
    storageType: StorageType = new StorageType();
    feedRates: StorageFeedRates = new StorageFeedRates();
    images:string[] = [];
    storageBeforeStocktake: StorageFacility = null;
    lastStocktake: Stocktake = new Stocktake();
    lastDelivery: Delivery = new Delivery();
    
    constructor(instanceData?: any) {
        if (instanceData) {
            this.id = instanceData.id;
            this.name = instanceData.name;
            this.metrics = new StorageMetrics(instanceData.storageMetrics);
            this.dimensions = new StorageDimensions(instanceData.storageDimensions);
            this.storageType = new StorageType(instanceData.storageType);
            this.feedRates = new StorageFeedRates(instanceData.storageFeedRates);
            this.images = instanceData.images;
            this.storageBeforeStocktake = new StorageFacility(instanceData.storageBeforeStocktake);
            this.lastStocktake = new Stocktake(instanceData.lastStocktake);
            this.lastDelivery = new Delivery(instanceData.lastDelivery);
        }
    }
}

export class StoredFeed {

    id: string = null;
    name: string = null;
    category: string = null;
    type: string = null;
    feedCode: string = null;
    wetDensity: number = 0;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.id = instanceData.id;
            this.name = instanceData.name;
            this.category = instanceData.category;
            this.type = instanceData.type;
            this.feedCode = instanceData.feedCode;
            this.wetDensity = instanceData.wetDensity;
        }
    }
}

export class StorageMetrics {

    capacity: number = 0;
    dailyTotalUsageRate: number = 0;
    runoutDays: number = 0;
    nextStocktakeDays: number = 0;
    weightDm: number = 0;
    weightAsFed: number = 0;
    currentFeedLevelVolume: number = 0;
    lastStocktakeFeedLevelPercentage: number = 0;
    lastStocktakeFeedLevelImage: string = null;
    runoutDaysDescription: string = null;
    nextStocktakeWarning: boolean = false;
    lastStocktakeWeightDm: number = 0;
    lastStocktakeWeightAsFed: number = 0;
    lastStocktakeFeedLevelVolume: number = 0;
    lastStocktakeMarketValue: number = 0;
    runoutWarning: boolean = false;
    currentWeightDm: number = 0;
    currentWeightAsFed: number = 0;
    currentFeedLevelPercentage: number = 0;
    currentFeedLevelImage: string = null;
    hasStocktakeDiscrepancy: boolean = false;
    feedLevelDiscrepancyAsFed: number = 0;
    feedLevelDiscrepancyPercentage: number = 0;
    runoutDate: Date = new Date();
    nextStocktakeDate: Date = new Date();
    
    constructor(instanceData?: any) {
        if (instanceData) {
            this.capacity = instanceData.capacity;
            this.dailyTotalUsageRate = instanceData.dailyTotalUsageRate;
            this.runoutDays = instanceData.runoutDays;
            this.nextStocktakeDays = instanceData.nextStocktakeDays;
            this.weightDm = instanceData.weightDm;
            this.weightAsFed = instanceData.weightAsFed;
            this.currentFeedLevelVolume = instanceData.currentFeedLevelVolume;
            this.lastStocktakeFeedLevelPercentage = instanceData.lastStocktakeFeedLevelPercentage;
            this.lastStocktakeFeedLevelImage = instanceData.lastStocktakeFeedLevelImage;
            this.runoutDaysDescription = instanceData.runoutDaysDescription;
            this.nextStocktakeWarning = instanceData.nextStocktakeWarning;
            this.lastStocktakeWeightDm = instanceData.lastStocktakeWeightDm;
            this.lastStocktakeWeightAsFed = instanceData.lastStocktakeWeightAsFed;
            this.currentFeedLevelVolume = instanceData.lastStocktakeFeedLevelVolume;
            this.lastStocktakeMarketValue = instanceData.lastStocktakeMarketValue;
            this.runoutWarning = instanceData.runoutWarning;
            this.currentWeightDm = instanceData.currentWeightDm;
            this.currentWeightAsFed = instanceData.currentWeightAsFed;
            this.currentFeedLevelPercentage = instanceData.currentFeedLevelPercentage;
            this.currentFeedLevelImage = instanceData.currentFeedLevelImage;
            this.hasStocktakeDiscrepancy = instanceData.hasStocktakeDiscrepancy;
            this.feedLevelDiscrepancyPercentage = instanceData.feedLevelDiscrepancyPercentage;
            this.runoutDate = new Date(instanceData.runoutDate);
            this.nextStocktakeDate = new Date(instanceData.nextStocktakeDate);
        }
    }
}

export class StorageDimensions {

    width: number = 0;
    height: number = 0;
    length: number = 0;
    diameter: number = 0;
    coneHeight: number = 0;
    bales: number = 0;
    bags: number = 0;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.width = instanceData.width;
            this.height = instanceData.height;
            this.length = instanceData.length;
            this.diameter = instanceData.diameter;
            this.coneHeight = instanceData.coneHeight;
            this.bales = instanceData.bales;
            this.bags = instanceData.bags;
        }
    }
}

export class StorageFeedRates {

    public quantifiedAs: string = null;
    milkers: StockConsumption = new StockConsumption();
    dry: StockConsumption = new StockConsumption();
    transition: StockConsumption = new StockConsumption();

    constructor(instanceData?: any) {
        if (instanceData) {
            this.quantifiedAs = instanceData.quantifiedAs;
            this.milkers = new StockConsumption(instanceData.milkers);
            this.dry = new StockConsumption(instanceData.dry);
            this.transition = new StockConsumption(instanceData.transition);
        }
    }
}

export class StockConsumption {

    number: number = 0;
    consumed: number = 0;
    wastage: number = 0;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.number = instanceData.number;
            this.consumed = instanceData.consumed;
            this.wastage = instanceData.wastage;
        }
    }
}

export class Stocktake {

    level: number = 0;
    dryMatter: number = 0;
    unitWeight: number = 0;
    unitValue: number = 0;
    recorded: Date = new Date();
    feed: StoredFeed = new StoredFeed();

    constructor(instanceData?: any) {
        if (instanceData) {
            this.level = instanceData.level;
            this.dryMatter = instanceData.dryMatter;
            this.unitWeight = instanceData.unitWeight;
            this.unitValue = instanceData.unitValue;
            this.recorded = instanceData.recorded;
            this.feed = new StoredFeed(instanceData.feed);
        }
    }
}

export class Delivery {

    feedId: string = null;
    productName: string = null;
    quantity: number = 0;
    unitWeight: string = null;
    feed: StoredFeed = new StoredFeed();

    constructor(instanceData?: any) {
        if (instanceData) {
            this.feedId = instanceData.feedId;
            this.productName = instanceData.productName;
            this.quantity = instanceData.quantity;
            this.unitWeight = instanceData.unitWeight;
            this.feed = new StoredFeed(instanceData.feed);
        }
    }
}

export class Task {

    name: string = null;
    step: string = null;
    stepTitle: string = null;
    stepInstruction: string = null;
    stepIndex:number = 0;
    farmId: string = null;
    storageFacilityId: string = null;
    storageTypeId: string = null;
    feedCategory: string = null;
    storageImage: string = null;
    isFirstStep: boolean = false;
    isLastStep: boolean = false;
    wetDensities: WetDensity = new WetDensity();
    steps: string[] = null; 
    feedRateQuantifiedAs: FeedTypesQuantifiedValues = new FeedTypesQuantifiedValues();
    
    constructor(instanceData?: any) {
        if (instanceData) {
            this.name = instanceData.name;
            this.step = instanceData.step;
            this.stepTitle = instanceData.stepTitle;
            this.stepInstruction = instanceData.stepInstruction;
            this.stepIndex = instanceData.stepIndex;
            this.farmId = instanceData.farmId;
            this.storageFacilityId = instanceData.storageFacilityId;
            this.storageTypeId = instanceData.storageTypeId;
            this.feedCategory = instanceData.feedCategory;
            this.storageImage = instanceData.storageImage;
            this.isFirstStep = instanceData.isFirstStep;
            this.isLastStep = instanceData.isLastStep;
            this.wetDensities = new WetDensity(instanceData.wetDensities);
            this.steps = instanceData.steps;
            this.feedRateQuantifiedAs = new FeedTypesQuantifiedValues(instanceData.feedRateQuantifiedAs);
        }
    }
}

export class FeedTypesQuantifiedValues {

    label: string = null;
    value: string = null;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.label = instanceData.label;
            this.value = instanceData.value;
        }
    }
}

export class WetDensity {

    hasValues: boolean = false;
    min: number = 0;
    max: number = 0;
    typical: number = 0;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.hasValues = instanceData.hasValues;
            this.min = instanceData.min;
            this.max = instanceData.max;
            this.typical = instanceData.typical;
        }
    }
}

export class HerdFeedRates {

    dry: AnimalFeedRate = new AnimalFeedRate();
    milkers: AnimalFeedRate = new AnimalFeedRate();
    transition: AnimalFeedRate = new AnimalFeedRate();
    
    constructor(instanceData?: any) {
        if (instanceData) {
            this.dry = new AnimalFeedRate(instanceData.dry);
            this.milkers = new AnimalFeedRate(instanceData.milkers);
            this.transition = new AnimalFeedRate(instanceData.transition);
        }
    }
}

export class AnimalFeedRate {

    number: number = 0;
    consumed: number = 0;
    wastage: number = 0;
    quantifiedAs: string = null;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.number = instanceData.number;
            this.consumed = instanceData.consumed;
            this.wastage = instanceData.wastage;
            this.quantifiedAs = instanceData.quantifiedAs;
        }
    }
}
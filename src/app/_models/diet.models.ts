import { FeedType } from './feedplan.models';

export class Diet {

    grazableForage: GrazableForage = new GrazableForage();
    milkers: Consumption = new Consumption();
    dry: Consumption = new Consumption()
    transition: Consumption = new Consumption()

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.grazableForage = instanceData.grazableForage;
        this.dry = instanceData.dry;
        this.milkers = instanceData.milkers;
        this.transition = instanceData.transition;
    }
}

export class GrazableForage {

    growthRate:number = 0;
    hectare: number = 0;
    utilisation:number = 0;
    available: number = 0;
    customRate: boolean = false;
    surplusDeficit: number = 0;
    isValid: boolean = false;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.growthRate = instanceData.growthRate;
        this.hectare = instanceData.hectare;
        this.utilisation = instanceData.utilisation;
        this.available = instanceData.available;
        this.customRate = instanceData.customRate;
        this.surplusDeficit = instanceData.surplusDeficit;
        this.isValid = instanceData.isValid;
    }
}

export class Consumption {

    consumed: number = 0;
    wastage: number = 0;
    comment: string = null;
    calc: ConsumptionCalculation = new ConsumptionCalculation();

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.consumed = instanceData.consumed;
        this.wastage = instanceData.wastage;
        this.comment = instanceData.comment;
        this.calc = new ConsumptionCalculation(instanceData.calc);
    }
}

export class ConsumptionCalculation {

    dm: number = 0;
    me: number = 0;
    cp: number = 0;
    ndf: number = 0;
    starch: number = 0;
    cost: number = 0;
    
    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.dm = instanceData.dm;
        this.me = instanceData.me;
        this.cp = instanceData.cp;
        this.ndf = instanceData.ndf;
        this.starch = instanceData.starch;
        this.cost = instanceData.cost;
    }
}

export class FeedAmount {

    consumed: number = 0;
    wasted: number = 0;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.consumed = instanceData.consumed;
        this.wasted = instanceData.wasted;
    }
}

export class FeedConsumed {
    
    me:number = 0;
    dm:number = 0;
    cp:number = 0;
    ndf:number = 0;
    starch:number = 0;
    fed: number = 0;
    cost: number = 0;
    wasted: number = 0;
    rateExceeded: boolean = false;
    warning: string = null;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.me = instanceData.me;
        this.dm= instanceData.dm;
        this.cp = instanceData.cp;
        this.ndf = instanceData.ndf;
        this.starch = instanceData.starch;
        this.fed = instanceData.fed;
        this.cost = instanceData.cost;
        this.wasted = instanceData.wasted;
        this.rateExceeded = instanceData.rateExceeded;
        this.warning = instanceData.warning;
    }
}

export class FeedClassification {

    type: string = null;
    comment: string = null;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.type = instanceData.type;
        this.comment = instanceData.comment;
    }
}

export class Nutrition {

    me:number = 0;
    dm:number = 0;
    cp:number = 0;
    ndf:number = 0;
    starch:number = 0;
    an:number = 0;
    bn:number = 0;
    cn:number = 0;
    ee:number = 0;
    adin:number = 0;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.me = instanceData.me;
        this.dm = instanceData.dm;
        this.cp = instanceData.cp;
        this.ndf = instanceData.ndf;
        this.starch = instanceData.starch;
        this.an = instanceData.an;
        this.bn = instanceData.bn;
        this.cn = instanceData.cn;
        this.ee = instanceData.ee;
        this.adin = instanceData.adin;
    }
}

export class Cost {

    costME: number = 0;
    costCP: number = 0;
    costDM: number = 0;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.costME = instanceData.costME;
        this.costCP = instanceData.costCP;
        this.costDM = instanceData.costDM;
    }
}

export class FeedCalculation {

    feedType: FeedType = new FeedType();
    feedConsumed: FeedConsumed = new FeedConsumed();

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.feedType = new FeedType(instanceData.feedType);
        this.feedConsumed = new FeedConsumed(instanceData.feedConsumed);
    }
}

export class DietRequirements {
    
    energyRequirement: number = 0;
    appetiteRequirement: number = 0;
    proteinRequirement: ProteinRequirement = new ProteinRequirement();

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.energyRequirement = instanceData.energyRequirement;
        this.appetiteRequirement = instanceData.appetiteRequirement;
        this.proteinRequirement = new ProteinRequirement(instanceData.proteinRequirement);
    }
}

export class ProteinRequirement {

    public required: number = 0;
    public supply: number = 0;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.required = instanceData.require;
        this.supply = instanceData.supply;
    }
}

export class DietCost {

    public milkIncomePerDay: number = 0
    public feedCostPerDay: number = 0
    public marginOverFeedCostPerDay: number = 0
    public feedCostPerKgDm: number = 0
    public feedCostOfMilkIncome: number = 0;
    public fce: number = 0;

    constructor(instanceData?: DietCost) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: DietCost) {
        this.milkIncomePerDay = instanceData.milkIncomePerDay;
        this.feedCostPerDay = instanceData.feedCostPerDay;
        this.marginOverFeedCostPerDay = instanceData.marginOverFeedCostPerDay;
        this.feedCostPerKgDm = instanceData.feedCostPerKgDm;
        this.feedCostOfMilkIncome = instanceData.feedCostOfMilkIncome;
        this.fce = instanceData.fce;
    }
}

export class DietNutrition {

    energyRatio: number = 0;
    energyRequired: number = 0;
    energySupplied:number = 0;
    energyValid: boolean = true;
    energyAmount: number = 0;
    proteinRatio: number = 0;
    proteinValid: boolean = true;
    proteinAmount: number = 0;
    proteinSupplied: number = 0;
    proteinRequired: number = 0;
    appetiteRatio: number = 0;
    appetiteValid: boolean = true;
    appetiteAmount: number = 0;
    appetiteRequired: number = 0;
    appetiteSupplied: number = 0;
    ndfRatio: number = 0;
    ndfValid: boolean = true;
    ndfAmount: number = 0;
    starchRatio: number = 0;
    starchValid: boolean = false;
    starchAmount: number = 0;
    forageConcentrateValid: boolean = true;
    dmAmount: number = 0;
    dietValid: boolean = true;
    forageConcentrateRatio = new ForageConcentrateRatio();

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.energyRatio = instanceData.energyRatio;
        this.energyRequired = instanceData.energyRequired;
        this.energySupplied = instanceData.energySupplied;
        this.energyValid = instanceData.energyValid;
        this.energyAmount = instanceData.energyAmount;
        this.proteinRatio = instanceData.proteinRatio;
        this.proteinValid = instanceData.proteinValid;
        this.proteinAmount = instanceData.proteinAmount;
        this.proteinSupplied = instanceData.proteinSupplied;
        this.proteinRequired = instanceData.proteinRequired;
        this.appetiteRatio = instanceData.appetiteRatio;
        this.appetiteValid = instanceData.appetiteValid;
        this.appetiteAmount = instanceData.appetiteAmount;
        this.appetiteRequired = instanceData.appetiteRequired;
        this.appetiteSupplied = instanceData.appetiteSupplied;
        this.ndfRatio = instanceData.ndfRatio;
        this.ndfValid = instanceData.ndfValid;
        this.ndfAmount = instanceData.ndfAmount;
        this.starchRatio = instanceData.starchRatio;
        this.starchValid = instanceData.starchValid;
        this.starchAmount = instanceData.starchAmount;
        this.forageConcentrateValid = instanceData.forageConcentrateValid;
        this.dmAmount = instanceData.dmAmount;
        this.dietValid = instanceData.dietValid;
        this.forageConcentrateRatio = instanceData.forageConcentrateRatio;
    }
}

export class ForageConcentrateRatio {

    forage: number = 0;
    concentrate: number = 0;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        this.forage = instanceData.forage;
        this.concentrate = instanceData.concentrate;
    }
}
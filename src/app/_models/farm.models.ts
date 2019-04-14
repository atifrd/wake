export class Farm {

    id: string = null;
    farmName: string = null;
    address: string = null;
    location: string = null;
    managerName: string = null;
    ownerName: string = null;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        const keys = Object.keys(this);

        for (const key of keys) {
            if (instanceData.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }

        this.id = instanceData.farmId;
    }
}

export class FarmSettings {

    daysSinceFeedplanUpdate: number = 0;
    daysSinceLastStocktake: number = 0;
    daysUntilFeedRunout: number = 0;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        const keys = Object.keys(this);

        for (const key of keys) {
            if (instanceData.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}


export class FarmLocation {

    id: string = null;
    name: string = null;
    region: string = null;

    constructor(instanceData?: any) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: any) {
        const keys = Object.keys(this);

        for (const key of keys) {
            if (instanceData.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}
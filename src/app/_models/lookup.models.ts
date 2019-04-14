export class GrowthRate {

    location:string = null;
    month:string = null;
    tenth:number = 0;
    twentyFifth:number = 0;
    fiftieth:number = 0;
    seventyFifth:number = 0;
    ninetieth:number = 0;

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

export class FeedCategory {

    id: string = null;
    name: string = null;

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

export class GrowthRateDisplay {
    
    text: string = null;
    value: number = null;

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
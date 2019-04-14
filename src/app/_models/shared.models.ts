export class Date {

    month: string = null;
    year: string = null;

    constructor(instanceData: any) {
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

export class Timezone {

    name: string = null;
    label: string = null;

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

export class MonthDisplay {

    text: string = null;
    month: number = 0;
    year: number = 0;

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


export class MonthLookup {

    name: string = null;
    days: number = 0;
    order: number = 0;

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
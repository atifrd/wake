import { Farm } from './farm.models';

export class UserSession {

    accessToken: string = null;
    refreshToken: string = null;
    farm: Farm = null;
    user: AuthenticatedUser = null;

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

export class AuthenticatedUser {

    firstName: string = null;
    lastName: string = null;
    timezone: string = null;
    roles: UserRole[];
    
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

export class UserRole {

    farmId: string = null;
    role: string = null;

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

export class UserProfile {

    email: string = null;
    firstName: string = null;
    id: string = null;
    lastName: string = null;
    notifyDeliveries: boolean = null;
    notifyFeedRunout: boolean = null;
    notifyFeedplan: boolean = null;
    notifyStocktake: boolean = null;
    timezone: string = null;

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

export class FarmUser {

    id: string = null;
    firstName: string = null;
    lastName: string = null;
    role: string = null;

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

export class InvitedUser {

    firstName: string = null;
    lastName: string = null;
    email: string = null;
    role: string = null;

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
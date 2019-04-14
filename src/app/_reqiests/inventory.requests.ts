export class RecordDelivery {
    feedId: string;
    productName: string;
    quantity: number;
    unitWeight: string;
}

export class RecordStocktake {
    level: number;
    feedId: string;
    unitWeight: number;
    unitValue: number;
    dryMatter: number;   
}

export class AddStorageFacility {
    storageTypeId: string;
    name: string;
    width: number;
    height: number;
    length: number;
    diameter: number;
    coneHeight: number;
    bags: number;
    bales: number;
    level: number;
    feedId: string;
    unitWeight: number;
    unitValue: number;
    dryMatter: number;
    feedRateQuantifiedAs: string;
    milkersNumber: number;
    milkersConsumed: number;
    milkersWastage: number;
    dryNumber: number;
    dryConsumed: number;
    dryWastage: number;
    transitionNumber: number;
    transitionConsumed: number;
    transitionWastage: number;
}
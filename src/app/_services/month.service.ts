import { Injectable } from '@angular/core';
import { MonthDisplay } from '../_models/shared.models';

@Injectable({
    providedIn: 'root'
})

export class MonthService {
    months = [
        { name: 'January', days: 31, order: 1, index: 0 },
        { name: 'February', days: 28, order: 2, index: 1 },
        { name: 'March', days: 31, order: 3, index: 2 },
        { name: 'April', days: 30, order: 4, index: 3 },
        { name: 'May', days: 31, order: 5, index: 4 },
        { name: 'June', days: 30, order: 6, index: 5 },
        { name: 'July', days: 31, order: 7, index: 6 },
        { name: 'August', days: 31, order: 8, index: 7 },
        { name: 'September', days: 30, order: 9, index: 8 },
        { name: 'October', days: 31, order: 10, index: 9 },
        { name: 'November', days: 30, order: 11, index: 10 },
        { name: 'December', days: 31, order: 12, index: 11 }
    ];

    nameForIndex(index: number) : string {
        return this.months[index].name;
    }

    indexForName(name: string) : number {
        try {
            return this.months.filter((month, index, items) => {
                if(month.name === name) {
                    return index;
                }
            })[0].index;
        } catch (ex) {
            console.error(`Unknown Month: ${ex}`);
            return 0;
        }
    }

    dateForMonth(text: string) : MonthDisplay {
        console.log(`Converting: ${text}`);
        let bits = text.split(" ");
        let month = new MonthDisplay();
        month.month = this.indexForName(bits[0]);
        month.year = Number(bits[1]);
        month.text = text;
        return month;
    }
}
import { Pipe, PipeTransform } from '@angular/core';
import { FeedType } from '../_models/feedplan.models';

@Pipe({
    name: 'feedByCategory',
    pure: false
})
export class FeedByCategoryPipe implements PipeTransform {
    transform(feeds: FeedType[], category: string): any {
        if (!feeds || !category) {
            return feeds;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return feeds.filter(feed => feed.category == category);
    }
}
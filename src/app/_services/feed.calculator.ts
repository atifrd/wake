import { Injectable } from '@angular/core';
import { FeedConsumed, FeedAmount, FeedClassification, Nutrition, Cost, Consumption, FeedCalculation, GrazableForage } from '../_models/diet.models';
import { FeedType, FeedAvailabilityValidation } from '../_models/feedplan.models';

@Injectable({
  providedIn: 'root'
})

export class FeedCalculatorService {

  constructor() { }

    // nutritional value of feed type
    // used when displaying nutrition info in the feed type screen and seeding into the
    // diet calculation algorithm
    feedNutrition(feedType:FeedType): Nutrition {

        let feedNutrition = new Nutrition();

        feedNutrition.adin = feedType.adin;
        feedNutrition.me = feedType.me;
        feedNutrition.dm = feedType.dm/10;
        feedNutrition.cp = feedType.cp/10;
        feedNutrition.ndf = feedType.ndf/10;
        feedNutrition.starch = feedType.starch;
        feedNutrition.an = feedType.an;
        feedNutrition.bn = feedType.bn;
        feedNutrition.cn = feedType.cn;
        feedNutrition.ee = feedType.ee;

        return feedNutrition;
    }

    // cost of given feed type as displayed on the Feed Type Setup
    // used when displaying the information for a feed type in the feed types screen
    feedCost(feedType:FeedType) : Cost {
      
      var dmConstant = feedType.asFedOrDM === 'asFed' ? feedType.dm/1000 : 1;
      
      // convert cost per tonne to cost per kg for given feed
      var costPerKgDM = feedType.asFedOrDM === 'asFed' ?
        (feedType.marketPrice/1000)/dmConstant :
        feedType.marketPrice/1000;

      // convert perKg cost from $ to cents by x 100
      var centsPerMjME = (costPerKgDM*100)/feedType.me;

      // convert CP from g kG to % by dividing by 10
      var costPerKgCP = costPerKgDM/((feedType.cp/10)/100);

      let feedCost = new Cost();

      feedCost.costME = centsPerMjME;
      feedCost.costCP = costPerKgCP;
      feedCost.costDM = costPerKgDM;

      return feedCost;
    }

    // used to generate the amount of energy, matter, protein and cost for a particular feed
    feedConsumption(feedType: FeedType, feedAmounts: Consumption) : FeedConsumed {

        var dmConstant = feedType.asFedOrDM === 'asFed' ? feedType.dm/1000 : 1;

        let feedConsumed = new FeedConsumed();

        feedConsumed.dm = feedAmounts.consumed*dmConstant;
        feedConsumed.fed = (feedAmounts.consumed+feedAmounts.wastage)*dmConstant,
        feedConsumed.me = feedType.me*feedAmounts.consumed,
        feedConsumed.cp = feedType.cp*feedAmounts.consumed*dmConstant,
        feedConsumed.ndf = feedType.ndf*feedAmounts.consumed*dmConstant,
        feedConsumed.starch = feedType.starch*feedAmounts.consumed*dmConstant,
        feedConsumed.cost = feedType.marketPrice/1000*feedAmounts.consumed+(feedType.marketPrice/1000*feedAmounts.consumed)*(feedAmounts.wastage/100)*dmConstant;

        return feedConsumed;
    }

    // calculate based on known dietary total dm, if a feed exceeds its feed rate limit


    // private grazableForageConfigured(grazableForage: GrazableForage)  {
    //   if(!grazableForage.customRate || grazableForage.growthRate == 0) {
    //     grazableForage.isValid = false;
    //   }

    //   if(grazableForage.hectare == 0) {
    //     grazableForage.isValid = false;
    //   }

    //   if(grazableForage.utilisation == 0) {
    //     grazableForage.isValid = false;
    //   }

    //   if(grazableForage.available == 0) {
    //     grazableForage.isValid = false;
    //   }
    // }

    // a representation of the properties of the given feed
    feedWithConstants(feedType: FeedType) {
      var cloned: FeedType = Object.assign({}, feedType);
      return cloned;
    }

    // a calculation of the amount of feed supplied
    feedSupplied(feedConsumed:FeedConsumed, consumption:Consumption) {

        var feedSupplied = new FeedConsumed();

        feedSupplied.dm = feedConsumed.dm;
        feedSupplied.me = feedConsumed.me;
        feedSupplied.cp = feedConsumed.cp;
        feedSupplied.ndf = feedConsumed.ndf;
        feedSupplied.starch = feedConsumed.starch;
        feedSupplied.fed = consumption.consumed;
        feedSupplied.wasted = (consumption.wastage/100)*consumption.consumed;
        feedSupplied.cost = feedConsumed.cost;
        feedSupplied.rateExceeded = false;
        feedSupplied.warning = consumption.comment;
      

    // TODO: HC Commented this out. Fix MUST BE DONE

    //   if(feedClassification.type === 'concentrate'){
    //     feedSupplied.forage = feedSupplied.dm;
    //   }
    //   else if(feedClassification.type == 'forage'){
    //     feedSupplied.concentrate = feedSupplied.dm;
    //   }

      return feedSupplied;
    }

    feedAvailability(feed: FeedCalculation, grazableForage: GrazableForage, stockNumbers:Number) : FeedAvailabilityValidation {
      let valid = new FeedAvailabilityValidation();
      if(feed.feedType.category === "Pastures") {
        let available:number = grazableForage.available;
        grazableForage.isValid = (grazableForage.hectare > 0 && grazableForage.utilisation > 0);

        if(available > 0) {
          grazableForage.available = available / (stockNumbers as number);
        } else {
          grazableForage.available = 0;
        }

        grazableForage.surplusDeficit = grazableForage.available - feed.feedConsumed.fed;
        if(grazableForage.surplusDeficit < 0) {
          feed.feedConsumed.rateExceeded = true;
          feed.feedConsumed.warning = "You do not have enough available for your stock to feed this amount";
        } else {
          feed.feedConsumed.rateExceeded = false;
        }

        if(grazableForage.isValid == false) {
          valid.validSetup = false;
        }
        if(grazableForage.surplusDeficit < 0){
          valid.validUsage = false;
        }
      }

      return valid;
    }
}
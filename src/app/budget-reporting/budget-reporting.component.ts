import { Component, OnInit } from '@angular/core';
import { FeedPlanSetupComponent } from '../feed-plan-setup/feed-plan-setup.component';
import { FeedplanService } from '../_services/feedplan.service';
import { FarmService } from '../_services/farm.service';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { FeedCalculatorService } from '../_services/feed.calculator';
import { DietCalculatorService } from '../_services/diet.calculator';
import { Feedplan } from '../_models/feedplan.models';

@Component({
  selector: 'app-budget-reporting',
  templateUrl: './budget-reporting.component.html',
  styleUrls: ['./budget-reporting.component.scss']
})
export class BudgetReportingComponent implements OnInit {

  static feedCalculator: FeedCalculatorService = new FeedCalculatorService();
  static dietCalculator: DietCalculatorService = new DietCalculatorService();

  constructor(
    private router: Router,
    public feedplan: FeedplanService,
    public farm: FarmService,
    private account: AccountService
  ) { }

  // totals = {
  //     tonnes: 0,
  //     cost: 0
  // };

  // costData: [];
  // tonnesData: [];

  ngOnInit() {
   
  }

  // setup(){
    
  //     function totals(feedplan: Feedplan) {
  //         return function(type, feed) {
  //             return BudgetReportingComponent.dietCalculator.dietReports(feedplan, type, feed);
  //         };
  //     }
  //     vm.totals = totals(vm.feedPlan.stockDetails);
  //     vm.costData = [];
  //     vm.tonnesData = [];
  //     vm.feedPlan.feedTypes.map(function(x, i) {
  //         vm.costData.push({
  //             key: x.name,
  //             values: []
  //         });
  //         vm.tonnesData.push({
  //             key: x.name,
  //             values: []
  //         });
  //         vm.feedPlan.stockDetails.map(function(y) {
  //             var totalAmountConsumed = ((y.diet[i].milkers.consumed + ((y.diet[i].milkers.wastage/100)*y.diet[i].milkers.consumed))
  //                 + (y.diet[i].dry.consumed + ((y.diet[i].dry.wastage/100)*y.diet[i].dry.consumed))
  //                 + (y.diet[i].transition.consumed + ((y.diet[i].transition.wastage/100)*y.diet[i].transition.consumed)));

  //             //if(totalAmountConsumed > 0){
  //                 var totalDays = this.daysInMonth(y.month);
  //                 var totalStock = y.numberOfAnimals.dry + y.numberOfAnimals.transition + y.numberOfAnimals.milkers;
  //                 vm.costData[i].values.push({
  //                     x: y.month,
  //                     y: x.marketPrice/1000 * totalAmountConsumed * totalDays * totalStock
  //                 });
  //                 vm.tonnesData[i].values.push({
  //                     x: y.month,
  //                     y: (totalAmountConsumed * totalDays * totalStock)/1000
  //                 });
  //             //}
  //         });
  //     });

  //     // strip empty cost data items from cost and tonnes:
  //     vm.costData = _.filter(vm.costData,
  //         function(cost){
  //             var total = _.reduce(cost.values, function(sum, val) {
  //                 return sum + val.y;
  //             }, 0);
  //             return total > 0;
  //         }
  //     );
  //     vm.tonnesData = _.filter(vm.tonnesData,
  //         function(tonnes){
  //             var total = _.reduce(tonnes.values, function(sum, val){
  //                 return sum + val.y;
  //             }, 0);
  //             return total > 0;
  //         }
  //     );
  // }

  // tonnesForMonth(feed, month){
  //     var tonnes = 0;
  //     _.forEach(vm.tonnesData, function (feedName){
  //        if(feedName.key == feed.name){
  //            _.forEach(feedName.values, function(feedValue){
  //                if(feedValue.x == month.month){
  //                     tonnes = feedValue.y;
  //                }
  //            });
  //        }
  //     });
  //     return tonnes;
  // }

  // totalTonnes(feed, month){
  //     var tonnes = 0;
  //     _.forEach(vm.tonnesData, function (feedName){
  //        if(feedName.key == feed.name){
  //            _.forEach(feedName.values, function(feedValue){
  //                tonnes += feedValue.y;
  //            });
  //        }
  //     });
  //     return tonnes;
  // }

  // entireTonnes(){
  //     var tonnes = 0;
  //     _.forEach(vm.tonnesData, function (feedName){
  //        //if(feedName.key == feed.name){
  //            _.forEach(feedName.values, function(feedValue){
  //                tonnes += feedValue.y;
  //            });
  //        //}
  //     });
  //     return tonnes;
  // }

  // costForMonth(feed, month){
  //     var cost = 0;
  //     _.forEach(vm.costData, function (feedName){
  //        if(feedName.key == feed.name){
  //            _.forEach(feedName.values, function(feedValue){
  //                if(feedValue.x == month.month){
  //                     cost = feedValue.y;
  //                }
  //            });
  //        }
  //     });
  //     return cost;
  // }

  // totalCost(feed){
  //     var cost = 0;
  //     _.forEach(vm.costData, function (feedName){
  //        if(feedName.key == feed.name){
  //            _.forEach(feedName.values, function(feedValue){
  //                cost += feedValue.y;
  //            });
  //        }
  //     });
  //     return cost;
  // }

  // entireCost(){
  //     var cost = 0;
  //     _.forEach(vm.costData, function (feedName){
  //        //if(feedName.key == feed.name){
  //            _.forEach(feedName.values, function(feedValue){
  //                cost += feedValue.y;
  //            });
  //        //}
  //     });
  //     return cost;
  // }

  // pushMetrics(){
  //     return this.account.budgetReportMetrics();
  // }

  // daysInMonth(){
  //   var monthYear: any = this.monthAndYear.split(' ');
  //   var numberOfDays = 0;
  //   switch(monthYear[0]){
  //     case 'January': numberOfDays = 31;break;
  //     case 'February':
  //     {
  //       numberOfDays = monthYear[1]%4==0 ? 29:28;
  //     }
  //     break;
  //     case 'March': numberOfDays = 31;break;
  //     case 'April': numberOfDays = 30;break;
  //     case 'May': numberOfDays = 31;break;
  //     case 'June': numberOfDays = 30;break;
  //     case 'July': numberOfDays = 31;break;
  //     case 'August': numberOfDays = 31;break;
  //     case 'September': numberOfDays = 30;break;
  //     case 'October': numberOfDays = 31;break;
  //     case 'November': numberOfDays = 30;break;
  //     case 'December': numberOfDays = 31;break;
  //   }
  //   return numberOfDays;
  // }

  // var tonnesOptions = {
  //     chart: {
  //         type: 'multiBarChart',
  //         height: 300,
  //         xAxis: {
  //             axisLabel: 'Month'
  //         },
  //         yAxis: {
  //             axisLabel: 'Tonnes',
  //             axisLabelDistance: -20
  //         }
  //     }
  // };

  // var costOptions = {
  //     chart: {
  //         type: 'multiBarChart',
  //         height: 300,
  //         stacked: true,
  //         xAxis: {
  //             axisLabel: 'Month'
  //         },
  //         yAxis: {
  //             axisLabel: 'Dollars',
  //             axisLabelDistance: -20
  //         }
  //     }
  // };


  

  close() {
    this.router.navigate(['farms', this.farm.farmValue.id, 'feed-plan']);
  }
}

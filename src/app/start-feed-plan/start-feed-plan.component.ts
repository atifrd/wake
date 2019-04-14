import { Component, OnInit, Inject } from '@angular/core';
import { LookupService } from '../_services/lookup.service';
import { FarmService } from '../_services/farm.service';
import { MonthLookup, MonthDisplay } from '../_models/shared.models';
import { HerdBooleans, Feedplan } from '../_models/feedplan.models';
import { Farm } from '../_models/farm.models';
import { Subscription } from 'rxjs';
import { FeedplanService } from '../_services/feedplan.service';
import { BsModalRef } from 'ngx-foundation';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-start-feed-plan',
  templateUrl: './start-feed-plan.component.html',
  styleUrls: ['./start-feed-plan.component.sass']
})

export class StartFeedPlanComponent implements OnInit {

farm: Farm;
farmSubscription: Subscription;

monthNames: Array<MonthLookup> = [];
monthNamesSubscription: Subscription;

feedplan: Feedplan;
feedplanSubscription: Subscription;

startMonth: MonthDisplay = null;
cows: HerdBooleans = new HerdBooleans();
currentDate = new Date();
currentMonth = this.currentDate.getMonth();
currentYear = this.currentDate.getFullYear();
months:Array<MonthDisplay> = [];

paramFromParent: string;
resultForParent: string = "";


constructor(
  public bsModalRef: BsModalRef,
  public lookupService: LookupService,
  public farmService: FarmService,
  public feedplanService: FeedplanService,
  )
  {
    this.monthNamesSubscription = this.lookupService.months.subscribe(months => {
      this.monthNames = months;
    });
    this.setupCalendar();
  }

  ngOnInit() { 
    
    this.farmSubscription = this.farmService.farm.subscribe(farm => {
      this.farm = farm;
    });

    this.feedplanSubscription = this.feedplanService.feedplan.subscribe(feedplan => {
      this.feedplan = feedplan;
    });

    this.startMonth = this.months[0];
  }

  ngOnDestroy(){
    this.farmSubscription.unsubscribe();
    this.feedplanSubscription.unsubscribe();
    this.monthNamesSubscription.unsubscribe();
  }

  setupCalendar(){
    for (var index = 0; index < 12; index++) {
      var monthIndex = (this.currentMonth+index)%12;
      if (index != 0 && monthIndex == 0) {
          this.currentYear += 1;
      }
      let month = new MonthDisplay();
      month.text = `${this.monthNames[monthIndex].name} ${this.currentYear}`;
      month.month = monthIndex;
      month.year = this.currentYear;
      this.months.push(month);
    }
  }

  goToStockDetails() {
    this.feedplanService.createNewFeedPlan(this.farmService.farmValue.id, this.startMonth, this.cows);
  }

  save(){   
    this.close();
  }

  close(){
    this.resultForParent = "Confirm";
    this.bsModalRef.hide();

  }

  cancel(){
    this.resultForParent = "Cancel";
    this.bsModalRef.hide();
  }
}

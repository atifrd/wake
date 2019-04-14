import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { Feedplan, HerdBooleans, FeedType } from '../_models/feedplan.models';
import { Subscription } from 'rxjs';
import { FeedplanService } from '../_services/feedplan.service';
import { FormBuilder } from '@angular/forms';
import { MonthDisplay } from '../_models/shared.models';
import * as _ from 'lodash';
import { Diet } from '../_models/diet.models';
import { LookupService } from '../_services/lookup.service';
import { FarmService } from '../_services/farm.service';
import { Router } from '@angular/router';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: '[app-edit-diet].feed-plan-setup-content-row .grid-container',
  templateUrl: './edit-diet.component.html',
  styleUrls: ['./edit-diet.component.scss']
})

export class EditDietComponent implements OnInit {

  feedplanSubscription: Subscription;

  month: MonthDisplay;
  cow: string;
  selectedFeedType: FeedType = null;
  sortedFeedTypes: Array<FeedType> = [];
  diet: Diet;
  cowTypeCount: number = 0;
  selectedTabIndex: number = 0;
  selectedTabMonth: string = "";

  slider = {
    value: 10,
    options: {
      floor: 0,
      ceil: 100,
      translate: (v:any) => {
          return v + '%';
      }
    }
  };

  constructor(
    public feedplan: FeedplanService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private lookup: LookupService,
    private farm: FarmService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.feedplanSubscription = this.feedplan.feedplan.subscribe(feedplan => {
      if(feedplan){
        ///TODO_4UI_2019-4-10
        this.feedplan.initialiseDiet();
        
        this.setup();
        // this.selectTab(0);
      }
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnDestroy(){
    this.feedplanSubscription.unsubscribe();
  }

  setup(){
    this.sortedFeedTypes = _.sortBy(this.feedplan.feedplanValue.scenario.feedTypes, feed => {
      if (feed.category === 'Pastures') {
        return feed.name.toLowerCase().charCodeAt(0) - 97;
      } else{
        return (feed.name.toLowerCase().charCodeAt(0) - 97) * 100;
      }
    });

    for (var index = 0; index < this.feedplan.feedplanValue.scenario.stockDetails.length; index++) {
      if (index == 0) {
        //this.feedplan.scenario.stockDetails[index].activeDiet = true;
      } else {
        //this.feedplan.scenario.stockDetails[index].activeDiet = false;
      }
      this.setDateDetails(index);
    }

    for (var cow in this.feedplan.feedplanValue.scenario.cows) {
      if (this.feedplan.feedplanValue.scenario.cows[cow] == true) {
        this.cowTypeCount++;
      }
    }
  }

  setDateDetails(itemIndex: number){
    let monthDisplay = new MonthDisplay();
    if (itemIndex == 0) {
      var monthIndex = (Number(this.feedplan.feedplanValue.scenario.date.month) + itemIndex) % 12;
      monthDisplay.month = monthIndex + 1;
      monthDisplay.text = this.lookup.monthsValue[monthIndex].name;
      monthDisplay.year = this.feedplan.feedplanValue.scenario.date.year;
    } else {
      var previousMonthDetails = this.feedplan.feedplanValue.scenario.stockDetails[itemIndex - 1];
      monthDisplay.month = previousMonthDetails.date.month == 12 ? 1 : previousMonthDetails.date.month + 1;
      monthDisplay.year = previousMonthDetails.date.month == 12 ? previousMonthDetails.date.year + 1 : previousMonthDetails.date.year;
      monthDisplay.text = this.lookup.monthsValue[monthDisplay.month - 1].name;
    }
    this.feedplan.feedplanValue.scenario.stockDetails[itemIndex].date = monthDisplay;
  }

  dollars(n:number) {
    return '$' + Number(n).toFixed(2);
  }

  editDiet(cow:string, diet:Diet) {
    this.diet = diet;
    this.cow = cow;
    this.sortedFeedTypes = _
    .chain(this.feedplan.feedplanValue.scenario.feedTypes)
    .filter((feed) => {
      return feed.cows[this.cow] === true;
    })
    .sortBy((feed) => {
      if (feed.category === 'Pastures') {
        return feed.name.toLowerCase().charCodeAt(0) - 97;
      } else{
        return (feed.name.toLowerCase().charCodeAt(0) - 97) * 100;
      }
    })
    .value();
  }

  editAvailability() {

  }

  selectTab(index: number){
    this.selectedTabIndex = index;
    if(this.feedplan.feedplanValue.scenario.stockDetails.length > 0){
      this.selectedTabMonth = this.feedplan.feedplanValue.scenario.stockDetails[index].month;
    }
  }

  forageModal(template: TemplateRef<any>, feedType: FeedType){ 
    this.selectedFeedType = feedType;
    this.selectedTabMonth = this.feedplan.feedplanValue.scenario.stockDetails[this.selectedTabIndex].month;
    this.modalService.show(template);//, {class: 'large'});
  }

  dietModal(template: TemplateRef<any>,action: string, context:string ,feedType: FeedType){ 
    if(action === 'editDiet') {
      this.cow = context;
    }
    this.selectedFeedType = feedType;
    this.selectedTabMonth = this.feedplan.feedplanValue.scenario.stockDetails[this.selectedTabIndex].month;
    this.modalService.show(template);//, {class: 'large'});
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.show(template);//, {class: 'large'});
  }

  back() {
    this.feedplan.saveFeedPlan();
    this.router.navigate(['farms', this.farm.farmValue.id, 'feed-plan', 'setup', 'feed']);
  }

  cancel() {
    this.router.navigate(['feed-plan']);
  }

  saveAndClose() {
    this.feedplan.saveFeedPlan();
    this.router.navigate(['feed-plan']);
  } 
}
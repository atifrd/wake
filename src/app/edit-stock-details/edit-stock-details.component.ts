import { Component, OnInit, OnDestroy, TemplateRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FeedplanService } from '../_services/feedplan.service';
import { Subscription } from 'rxjs';
import { HerdBooleans, StockDetails } from '../_models/feedplan.models';
import { LookupService } from '../_services/lookup.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmService } from '../_services/farm.service';
import { ModalService } from '../_services/modal.service';
import { MonthDisplay } from '../_models/shared.models';

@Component({
  selector: '[app-edit-stock-details].feed-plan-setup-content-row .grid-container',
  templateUrl: './edit-stock-details.component.html',
  styleUrls: ['./edit-stock-details.component.sass']
})

export class EditStockDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  feedplanSubscription: Subscription;
  cowTypeCount:number = 0;
  valid = new HerdBooleans();

  public stockForm: FormGroup;
  stockFormSubscription: Subscription;


  constructor(
    public feedplan: FeedplanService,
    private lookup: LookupService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private farm: FarmService,
    private router: Router,
    private cd: ChangeDetectorRef
  )   
  {

  }

  ngOnInit() {
    this.feedplanSubscription = this.feedplan.feedplan.subscribe(feedplan => {
      if(feedplan)
        //this.setDateDetails(0);
        this.setupForm();
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnDestroy(){
    this.feedplanSubscription.unsubscribe();
    if(this.stockFormSubscription) {
      this.stockFormSubscription.unsubscribe();
    }
  }

  setupForm() {
    let stockDetails = this.feedplan.feedplanValue.scenario.stockDetails[0];
    if(stockDetails) {
    this.stockForm = new FormGroup({
      averageDaysInMilk: new FormControl(stockDetails.averageDaysInMilk, Validators.required),
      averageDaysPregnant: new FormControl(stockDetails.averageDaysPregnant, Validators.required),
      averageDistanceMilkers: new FormControl(stockDetails.averageDistanceWalkedPerDay.milkers),
      averageDistanceTransition: new FormControl(stockDetails.averageDistanceWalkedPerDay.transition),
      averageDistanceDry: new FormControl(stockDetails.averageDistanceWalkedPerDay.dry),
      averageLiveWeightMilkers: new FormControl(stockDetails.averageLiveWeight.milkers),
      averageLiveWeightDry: new FormControl(stockDetails.averageLiveWeight.dry),
      averageLiveWeightTransition: new FormControl(stockDetails.averageLiveWeight.transition),
      averageMilkYield: new FormControl(stockDetails.averageMilkYield),
      centsLitre: new FormControl(stockDetails.centsLitre),
      diet: new FormControl(stockDetails.diet),
      dietValidation: new FormControl(stockDetails.dietValidation),
      feedInstructionNames: new FormControl(stockDetails.feedInstructionNames),
      liveweightChangeMilkers: new FormControl(stockDetails.liveweightChange.milkers),
      liveweightChangeTransition: new FormControl(stockDetails.liveweightChange.transition),
      liveweightChangeDry: new FormControl(stockDetails.liveweightChange.dry),
      milkFat: new FormControl(stockDetails.milkFat),
      milkFatPrice: new FormControl(stockDetails.milkFatPrice),
      milkPrice: new FormControl(stockDetails.milkPrice),
      milkProtein: new FormControl(stockDetails.milkProtein),
      milkProteinPrice: new FormControl(stockDetails.milkProteinPrice),
      month: new FormControl(stockDetails.month),
      numberOfMilkers: new FormControl(stockDetails.numberOfAnimals.milkers),
      numberOfTransition: new FormControl(stockDetails.numberOfAnimals.transition),
      numberOfDry: new FormControl(stockDetails.numberOfAnimals.dry),
      terrainDry: new FormControl(stockDetails.terrain.milkers),
      terrainMilkers: new FormControl(stockDetails.terrain.dry),
      terrainTransition: new FormControl(stockDetails.terrain.transition)
    });  
    }

    this.stockFormSubscription = this.stockForm
      .valueChanges
      .subscribe(data => this.updateOnChange());
  }

  updateOnChange(){
    this.feedplan.validate();
  }

  setDateDetails(itemIndex: number){
    console.log("SetDateDetails being called");
    var monthIndex = (Number(this.feedplan.feedplanValue.scenario.date.month) + itemIndex) % 12;
    let month = new MonthDisplay();
    if (itemIndex == 0) {
      month.text = `${this.lookup.monthsValue[monthIndex].name} ${ this.feedplan.feedplanValue.scenario.date.year}`;
      month.year = this.feedplan.feedplanValue.scenario.date.year;
      month.month = monthIndex;
      this.feedplan.feedplanValue.scenario.stockDetails[itemIndex].date = month;
      this.feedplan.feedplanValue.scenario.stockDetails[itemIndex].month = this.lookup.monthsValue[monthIndex].name + ' ' + this.feedplan.feedplanValue.scenario.date.year;
    } else {
      var previousMonthDetails = this.feedplan.feedplanValue.scenario.stockDetails[itemIndex - 1];
      month.month = previousMonthDetails.date.month == 12 ? 1 : previousMonthDetails.date.month + 1;
      month.year = previousMonthDetails.date.month == 12 ? previousMonthDetails.date.year + 1 : previousMonthDetails.date.year;
      month.text = this.lookup.monthsValue[monthIndex].name;
      this.feedplan.feedplanValue.scenario.stockDetails[itemIndex].date = month;
      this.feedplan.feedplanValue.scenario.stockDetails[itemIndex].month = this.lookup.monthsValue[monthIndex].name + ' ' + month.year;
    }
  }

  openModal(template: TemplateRef<any> , cssClass : string = '') {
    this.modalService.show(template, cssClass);
  }

  close(){
    this.modalService.hide();
  }

  addNewMonth(){
    console.log("add an empty month");
    this.feedplan.addStockDetails(false, null);
    let newStockIndex = this.feedplan.feedplanValue.scenario.stockDetails.length - 1;
    this.setDateDetails(newStockIndex);
    this.selectMonth(newStockIndex);
    this.close();
  }

  cloneLastMonth(){
    console.log("Add a clone of the previous month");
    this.feedplan.addStockDetails(true, null);
    let newStockIndex = this.feedplan.feedplanValue.scenario.stockDetails.length - 1;
    this.setDateDetails(newStockIndex);
    this.selectMonth(newStockIndex);
    this.close();
  }

  selectMonth(tab: number) {
    for (let index = 0; index < this.feedplan.feedplanValue.scenario.stockDetails.length; index++) {
        if (tab ===  index){
          this.feedplan.feedplanValue.scenario.stockDetails[index].activeStockDetails = true;
        } else{
          this.feedplan.feedplanValue.scenario.stockDetails[index].activeStockDetails = false;
        }
    }
  }

  removeMonth(){
    if(this.feedplan.feedplanValue.scenario.stockDetails.length>1){
      if (this.feedplan.feedplanValue.scenario.stockDetails[this.feedplan.feedplanValue.scenario.stockDetails.length-1].activeStockDetails == true) {
        this.selectMonth(this.feedplan.feedplanValue.scenario.stockDetails.length-2);
      }

      this.feedplan.removeStockDetails();
    }
  }

  next() {
    if (this.feedplan.feedplanValue.scenario.valid[0]) {
      this.feedplan.saveFeedPlan();
      this.router.navigate(['farms', this.farm.farmValue.id, 'feed-plan', 'setup', 'feed']);
    }
    else {
      // $modal.open({
      //     templateUrl: 'app/message/message.html',
      //     controller: 'MessageController',
      //     controllerAs: 'vm',
      //     windowClass: 'dynamic small in-sub-area',
      //     resolve: {
      //       title: function() {
      //         return 'Stock Details Missing';
      //       },
      //       message: function() {
      //         return 'Some stock details have not been filled in. You can only continue to the next step of your feed plan once all stock details have been completed.';
      //       }
      //     }
      //   }
      // );
      // angular.forEach(vm.stockDetailsForm.$error.required, function(field) {
      //   field.$setTouched();
      // });
    }
  }

  saveAndClose() {
    this.feedplan.saveFeedPlan();
    this.router.navigate(['feed-plan']);
  }

  cancel() {
    this.router.navigate(['feed-plan']);
  }
}
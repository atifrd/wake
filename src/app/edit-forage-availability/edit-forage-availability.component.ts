import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input, OnDestroy, TemplateRef } from '@angular/core';
import { FeedplanService } from '../_services/feedplan.service';
import { GrazableForage } from '../_models/diet.models';
import { FeedType } from '../_models/feedplan.models';
import { GrowthRate, GrowthRateDisplay } from '../_models/lookup.models';
import { LookupService } from '../_services/lookup.service';
import { FarmService } from '../_services/farm.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-edit-forage-availability',
  templateUrl: './edit-forage-availability.component.html',
  styleUrls: ['./edit-forage-availability.component.sass']
})

export class EditForageAvailabilityComponent implements OnInit, OnDestroy {

  grownThisMonth: number = 0;
  availableThisMonth: number = 0;
  otherGrowthRate: number = 0;

  hasLocationGrowthRates: boolean = false;
  location: string = "";
  feedType: FeedType = null;
  monthAndYear: string = "";
  stockIndex: number = 0;
  dietIndex: number = 0;

  growthRates: Array<GrowthRateDisplay> = [];
  selectedGrowthRate: GrowthRateDisplay = null;

  growthRateSubscription: Subscription;

  public forageForm: FormGroup;
  public grazableForage: GrazableForage = new GrazableForage();

  forageFormSubscription: Subscription;

  @Output() closeModal = new EventEmitter<boolean>();

  @Input() set selectedMonthAndYear(_monthAndYear: any) {
    this.monthAndYear = _monthAndYear;
  }

  @Input() set selectedFeedType(_feedType: any) {
    this.feedType = _feedType;
    //TODO::4UI
    this.dietIndex = this.feedType.index;
  }

  @Input() set selectedStockIndex(_stockIndex: any) {
    this.stockIndex = _stockIndex;
  }

  @Input() set selectedDietIndex(_dietIndex: any) {
    //TODO::4UI
    //this.dietIndex = _dietIndex;
  }

  constructor(
    public feedplan: FeedplanService,
    private modalService: ModalService,
    private farm: FarmService,
    private lookup: LookupService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.lookup.clearGrowthRate();
    this.growthRates = new Array<GrowthRateDisplay>();
    this.selectedGrowthRate = new GrowthRateDisplay();
  }

  ngOnInit() {
    let otherRate = new GrowthRateDisplay();
    otherRate.text = "Other";
    otherRate.value = null;
    this.growthRates.push(otherRate);

    this.growthRateSubscription = this.lookup.growthRate.subscribe(growthRate => {
      if (growthRate && growthRate.location) {
        console.log(`Edit Forage: ngOnInit: growthRateSubscription loaded for ${growthRate.location}`);
        this.setupWithGrowthRates();
      }
    });

    var monthName = this.monthAndYear.split(" ")[0];

    this.lookup.loadFeedGrowthRates(this.feedType.name, this.farm.farmValue.location, monthName);
    this.grazableForage = this.feedplan.feedplanValue.scenario.stockDetails[this.stockIndex].diet[this.dietIndex].grazableForage;
    this.setupForm();
    
    //TODO::4UI
    this.doCalc();
    //this.updateOnChange();
  }

  ngAfterViewInit() {
    console.log('Edit Forage: ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('Edit Forage: ngOnDestroy');
    this.lookup.clearGrowthRate();

  }

  setupForm() {
    console.log('Edit Forage: setupForm');
    this.forageForm = new FormGroup({
      hectare: new FormControl(this.grazableForage.hectare),
      //TODO::4UI//otherGrowthRate: new FormControl(this.grazableForage.customRate),
      otherGrowthRate: new FormControl(this.grazableForage.growthRate),
      utilisation: new FormControl(this.grazableForage.utilisation),
      //TODO::4UI//selectedGrowthRate: new FormControl(this.grazableForage.growthRate)
      selectedGrowthRate: new FormControl(this.selectedGrowthRate)
    });

    this.forageFormSubscription = this.forageForm
      .valueChanges
      .subscribe(data => this.updateOnChange());
  }

  setupWithGrowthRates() {
    console.log('Edit Forage: setupWithGrowthRates');
    //TODO::4UI
    this.growthRates = [];
    //this.growthRates.pop();

    let poor = new GrowthRateDisplay();
    poor.text = `Poor (${this.lookup.growthRatesValue.tenth})Kg DM/ha)`;
    poor.value = this.lookup.growthRatesValue.tenth;
    this.growthRates.push(poor);

    let fair = new GrowthRateDisplay();
    fair.text = `Fair (${this.lookup.growthRatesValue.twentyFifth})Kg DM/ha)`;
    fair.value = this.lookup.growthRatesValue.twentyFifth;
    this.growthRates.push(fair);

    let good = new GrowthRateDisplay();
    good.text = `Good (${this.lookup.growthRatesValue.fiftieth})Kg DM/ha)`;
    good.value = this.lookup.growthRatesValue.fiftieth;
    this.growthRates.push(good);

    let verygood = new GrowthRateDisplay();
    verygood.text = `Very Good (${this.lookup.growthRatesValue.seventyFifth})Kg DM/ha)`;
    verygood.value = this.lookup.growthRatesValue.seventyFifth;
    this.growthRates.push(verygood);

    let exceptional = new GrowthRateDisplay();
    exceptional.text = `Poor (${this.lookup.growthRatesValue.ninetieth})Kg DM/ha)`;
    exceptional.value = this.lookup.growthRatesValue.ninetieth;
    this.growthRates.push(exceptional);

    let other = new GrowthRateDisplay();
    other.text = `Other`;
    other.value = null;
    this.growthRates.push(other);

    this.selectedGrowthRate = this.growthRates.find(item => item.value === this.grazableForage.growthRate);

    if (this.selectedGrowthRate == null) {
      this.selectedGrowthRate = this.growthRates[2];
    }

    if (this.grazableForage.customRate == true) {
      this.selectedGrowthRate = this.growthRates[5];
    }

    //TODO::4UI
    this.forageForm.get('selectedGrowthRate').setValue(this.selectedGrowthRate);

    this.hasLocationGrowthRates = this.growthRates.length > 1;
  }

  updateOnChange() {
    console.log('Edit Forage: updateOnChange');

    //TODO::4UI
    this.selectedGrowthRate = <GrowthRateDisplay>this.forageForm.get('selectedGrowthRate').value;
    if (this.selectedGrowthRate.text === 'Other' || this.growthRates.length === 1) {
      //TODO::4UI
      this.grazableForage.growthRate = this.forageForm.get('otherGrowthRate').value//this.otherGrowthRate;
      this.grazableForage.customRate = true;
    }
    else {
      //TODO::4UI
      this.grazableForage.customRate = false;
      this.grazableForage.growthRate = this.selectedGrowthRate.value;
    }

    this.grazableForage.utilisation = this.forageForm.get('utilisation').value;
    this.grazableForage.hectare = this.forageForm.get('hectare').value;
    this.doCalc();
    this.feedplan.validate();
  }

  doCalc() {
    this.grownThisMonth = this.grazableForage.growthRate / 1000 * this.grazableForage.hectare * this.daysInMonth();
    this.availableThisMonth = this.grownThisMonth * this.grazableForage.utilisation / 100;
    // available in kg of DM per day
    this.grazableForage.available = this.grazableForage.growthRate * this.grazableForage.hectare * this.grazableForage.utilisation / 100;
  }

  daysInMonth() {
    console.log('Edit Forage: daysInMonth');
    var monthYear: any = this.monthAndYear.split(' ');
    var numberOfDays = 0;
    switch (monthYear[0]) {
      case 'January': numberOfDays = 31; break;
      case 'February':
        {
          numberOfDays = monthYear[1] % 4 == 0 ? 29 : 28;
        }
        break;
      case 'March': numberOfDays = 31; break;
      case 'April': numberOfDays = 30; break;
      case 'May': numberOfDays = 31; break;
      case 'June': numberOfDays = 30; break;
      case 'July': numberOfDays = 31; break;
      case 'August': numberOfDays = 31; break;
      case 'September': numberOfDays = 30; break;
      case 'October': numberOfDays = 31; break;
      case 'November': numberOfDays = 30; break;
      case 'December': numberOfDays = 31; break;
    }
    return numberOfDays;
  }

  openLearnMoreModal(template: TemplateRef<any>) {
    console.log('Edit Forage: openLearnMore');
    this.modalService.show(template);
  }

  close() {
    console.log('Edit Forage: close');
    this.feedplan.updateGrazableForage(this.stockIndex, this.dietIndex, this.grazableForage);
    this.feedplan.validate();
    // this.feedplan.updateFeedPlan(this.farm.farmValue.farmId, this.feedplan.feedplanValue.feedPlanId, this.feedplan.feedplanValue);
    this.modalService.hide();
  }
}
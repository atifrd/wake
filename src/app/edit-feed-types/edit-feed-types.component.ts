import { Component, OnInit, TemplateRef } from '@angular/core';
import { Feedplan, HerdBooleans, FeedType } from '../_models/feedplan.models';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-foundation';
import { FeedplanService } from '../_services/feedplan.service';
import { LookupService } from '../_services/lookup.service';
import { FeedByCategoryPipe } from '../_helpers/feedbycategory.pipe';
import { FeedCategory } from '../_models/lookup.models';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { FarmService } from '../_services/farm.service';
import { ModalService } from '../_services/modal.service';
import { AccountService } from '../_services/account.service';

@Component({
  selector: '[app-edit-feed-types].feed-plan-setup-content-row .grid-container',
  templateUrl: './edit-feed-types.component.html',
  styleUrls: ['./edit-feed-types.component.sass']
})
export class EditFeedTypesComponent implements OnInit {

  //feedplan: Feedplan;
  feedplanSubscription: Subscription;

  cowTypeCount: number = 0;
  valid = new HerdBooleans();

  public feedTypeForm: FormGroup;
  feedFormSubscription: Subscription;

  feedTypes: FeedType[];
  feedTypesSubscription: Subscription;

  feedCategories: FeedCategory[];
  feedCategoriesSubscription: Subscription;

  feedCategory: FeedCategory;

  feedingAreas = ['Milking area', 'Support area', 'Purchased'];
  constructor(
    public feedplan: FeedplanService,
    private lookupService: LookupService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private farm: FarmService,
    private router: Router,
    private account: AccountService
  ) {

  }

  ngOnInit() {
    this.feedplanSubscription = this.feedplan.feedplan.subscribe(feedplan => {
      if (feedplan) {
        this.feedplan.initialise();
        this.setup();
      }
    });


    ///TODO_4UI : you can remove belowe code and get category list from this.feedTypes for better performance
    this.feedCategoriesSubscription = this.lookupService.feedCategories.subscribe(feedCategories => {
      this.feedCategories = feedCategories;

      ///TODO_4UI : remove duplicates
      var tfeedCategories = _.uniq(this.feedCategories);// Array.from(new Set(vm.feedCategories));

      this.feedCategories = _.sortBy(tfeedCategories, [
        'Pastures',
        'Other grazed forages',
        'Silages',
        'Hays',
        'Grains and concentrates',
        'Minerals and additives',
        'By products including straws'
      ]);
    });

    this.feedTypesSubscription = this.lookupService.feedTypes.subscribe(feedTypes => {
      this.feedTypes = feedTypes;
    });
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.feedplanSubscription.unsubscribe();
    this.feedTypesSubscription.unsubscribe();
    this.feedCategoriesSubscription.unsubscribe();
    if (this.feedFormSubscription)
      this.feedFormSubscription.unsubscribe();
  }

  setup() {
    for (var index = 0; index < this.feedplan.feedplanValue.scenario.feedTypes.length; index++) {
      if (index == 0) {
        this.feedplan.feedplanValue.scenario.feedTypes[index].active = true;
      } else {
        this.feedplan.feedplanValue.scenario.feedTypes[index].active = false;
      }
    }
    this.setupForm(this.feedplan.feedplanValue.scenario.feedTypes[0]);
  }

  setupForm(feedType: FeedType) {
    if (feedType) {
      this.feedTypeForm = new FormGroup({
        feedingArea: new FormControl(feedType.feedingArea),
        feedDescription: new FormControl(feedType.feedDescription),
        marketPrice: new FormControl(feedType.marketPrice),
        feedForTransition: new FormControl(feedType.cows.transition),
        feedForDry: new FormControl(feedType.cows.dry),
        feedForMilkers: new FormControl(feedType.cows.milkers),
        asFedOrDM: new FormControl(feedType.asFedOrDM)
      });

      this.feedFormSubscription = this.feedTypeForm
        .valueChanges
        .subscribe(data => this.updateOnChange(data));
    }
  }

  changeTab(feedType: FeedType) {
    this.setupForm(feedType);
  }

  updateOnChange(feedType: FeedType) {
    //TODO::4UI ngModel deprecated in angular 7 , but now it works!!! , plus I guess you should use formArray for FeedType[] forms
    // feedType.feedingArea = this.feedTypeForm.get('feedingArea').value;
    // feedType.feedDescription = this.feedTypeForm.get('feedDescription').value;
    // feedType.marketPrice = this.feedTypeForm.get('marketPrice').value;
    // feedType.cows.transition = this.feedTypeForm.get('feedForTransition').value;
    // feedType.cows.dry = this.feedTypeForm.get('feedForDry').value;
    // feedType.cows.milkers = this.feedTypeForm.get('feedForMilkers').value;
    // feedType.asFedOrDM = this.feedTypeForm.get('asFedOrDM').value;


    this.feedplan.validate();
  }

  openModal(template: TemplateRef<any>, cssClass: string = '') {
    this.modalService.show(template, cssClass);
  }

  close() {
    this.modalService.hide();
  }

  feedCategorySelected(category: FeedCategory) {
    this.feedCategory = category;
  }

  feedTypeSelected(feed: FeedType) {
    this.feedplan.addFeedType(feed);
    this.changeTab(feed);
    this.close();
    this.updateOnChange(feed);
    //this.setup();
  }

  removeFeedType(feedTypeIndex: number) {
    this.feedplan.removeFeedType(feedTypeIndex);
  }

  editFeedTypeDetails(index) {
    // var modalInstance = $modal.open({
    //     templateUrl: 'app/edit-feedtype-details/edit-feedtype-details.html',
    //     controller: 'EditFeedTypeDetailsController',
    //     controllerAs: 'vm',
    //     windowClass: 'dynamic small in-sub-area',
    //     resolve: {
    //         index: function() {
    //             return index;
    //         },
    //         feedType: function() {
    //             return this.feedplan.scenario.getFeedTypeDetails(index);
    //         },
    //         feedTypeName: function() {
    //             return this.feedplan.scenario.feedTypes[index].name;
    //         }
    //     }
    // });
    // modalInstance.result.then(function(item) {
    //     this.feedplan.scenario.updateFeedTypeDetails(item);
    // });
  }

  next() {
    if (this.feedplan.feedplanValue.scenario.valid[1]) {
      this.feedplan.saveFeedPlan();
      this.router.navigate(['farms', this.farm.farmValue.id, 'feed-plan', 'setup', 'diet']);
    }
    else {
      // $modal.open({
      //     templateUrl: 'app/message/message.html',
      //     controller: 'MessageController',
      //     controllerAs: 'vm',
      //     windowClass: 'dynamic small in-sub-area',
      //     resolve: {
      //       title: function() {
      //         return 'Feed Details Missing';
      //       },
      //       message: function() {
      //         return 'Some feed details have not been filled in. You can only continue to the next step of your feed plan once all feed details have been completed.';
      //       }
      //     }
      //   }
      // );
      // angular.forEach(this.feedTypesForm.$error.required, function(field) {
      //   field.$setTouched();
      // });
    }
  }

  back() {
    this.feedplan.saveFeedPlan();
    this.router.navigate(['farms', this.farm.farmValue.id, 'feed-plan', 'setup', 'stock']);
  }

  cancel() {
    this.router.navigate(['feed-plan']);
  }

  saveAndClose() {
    this.feedplan.saveFeedPlan();
    this.router.navigate(['feed-plan']);
  }
}

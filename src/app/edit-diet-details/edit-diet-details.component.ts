import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { FeedplanService } from '../_services/feedplan.service';
import { Subscription } from 'rxjs';
import { FeedType } from '../_models/feedplan.models';
import * as _ from 'lodash';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-edit-diet-details',
  templateUrl: './edit-diet-details.component.html',
  styleUrls: ['./edit-diet-details.component.sass']
})
export class EditDietDetailsComponent implements OnInit {

  feedplanSubscription: Subscription;

  @Input() set selectedCow(_cow: any) {
    this.cow = _cow;
  }

  @Input() set selectedMonth(_month: any) {
    this.month = _month;
  }

  selectedFeedType: FeedType = null;
  selectedTabMonth: string = "";


  cow: string;
  month: number;
  sortedFeedTypes: Array<FeedType> = [];
  constructor(
    public feedplan: FeedplanService,
    private cd: ChangeDetectorRef,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.feedplanSubscription = this.feedplan.feedplan.subscribe(feedplan => {
      if (feedplan) {
        this.setup();
        this.feedplan.initialise();
      }
    });
  }


  openLearnMoreModal(template: TemplateRef<any>) {
    this.modalService.show(template);
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.feedplanSubscription.unsubscribe();
  }

  updateOnChange() {
    console.log("model was changed");
    this.feedplan.validate();
  }

  close() {
    this.modalService.hide();
  }


  setup() {
    this.sortedFeedTypes = _.sortBy(this.feedplan.feedplanValue.scenario.feedTypes, feed => {
      if (feed.category === 'Pastures') {
        return feed.name.toLowerCase().charCodeAt(0) - 97;
      } else {
        return (feed.name.toLowerCase().charCodeAt(0) - 97) * 100;
      }
    });
  }

  
  forageModal(template: TemplateRef<any>, feedType: FeedType){ 
    this.selectedFeedType = feedType;
    this.selectedTabMonth = this.feedplan.feedplanValue.scenario.stockDetails[this.month].month;
    this.modalService.show(template);//, {class: 'large'});
  }
}
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Farm, FarmSettings } from '../_models/farm.models';
import { UserSession } from '../_models/user.models';
import { FarmService } from '../_services/farm.service';
import { AccountService } from '../_services/account.service';
import { FeedplanService } from '../_services/feedplan.service';
import { InventoryService } from '../_services/inventory.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Feedplan, HerdBooleans } from '../_models/feedplan.models';
import { BsModalService } from 'ngx-foundation/modal';
import { BsModalRef } from 'ngx-foundation/modal/bs-modal-ref.service';
import { MonthDisplay } from '../_models/shared.models';
import { LookupService } from '../_services/lookup.service';

@Component({
  selector: 'app-feed-plan',
  templateUrl: './feed-plan.component.html',
  styleUrls: ['./feed-plan.component.sass']
})

export class FeedPlanComponent implements OnInit, OnDestroy {
  
  modalRef: BsModalRef;
  startMonth: MonthDisplay;
  months: Array<MonthDisplay> = [];
  cows: HerdBooleans;

  // feedplan: Feedplan;
  feedplanSubscription: Subscription;
  
  hasFeedplan: boolean = false;

  // user: UserSession;
  // userSubscription: Subscription;
  isAuthenticated: boolean = false;
  
  // farm: Farm;
  // farmSubscription: Subscription;

  // farmSettingsSubscription: Subscription;
  // settings: FarmSettings;

  loadingFarm: boolean = true;
  loadingFeedplan: boolean = false;
  editName: boolean = false;
  notificationsMessageTypes: string[] = [];

  constructor(
    public farm: FarmService,
    public account: AccountService,
    public feedplan: FeedplanService,
    private router: Router,
    private modal: BsModalService,
    private lookup: LookupService
  ) 
  { }

  ngOnInit() {
    
    //this.feedplan.loadFeedplan(this.farm.farmValue.farmId);

    this.feedplanSubscription = this.feedplan.feedplan.subscribe(feedplan => {
      //this.feedplan = feedplan;
      this.loadingFeedplan = false;
      this.hasFeedplan = this.feedplan !== null && this.feedplan.feedplanValue.scenario !== null;
    });
  }

  ngOnDestroy() {
    this.feedplanSubscription.unsubscribe();
  }

  setNotificationSettings() {
    //this.notificationsMessageTypes.push(`Review feed plan every ${this.settings.daysSinceFeedplanUpdate} days`);
  }

  startAgain() {
    this.startFeedplan();
  }

  editFeedplan(path: string){
    console.log('going to edit feedplan');
    this.router.navigate(['farms', this.account.sessionValue.farm.id, 'feed-plan', 'setup', path]);
  }

  openModal(template: TemplateRef<any>) {

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    for (let index = 0; index < 12; index++) {
      let monthIndex = (currentMonth+index)%12;
      if (index != 0 && monthIndex == 0) {
          currentYear += 1;
      }
      let month = new MonthDisplay();
      month.text = `${this.lookup.monthsValue[monthIndex].name} ${currentYear}`;
      month.year = currentYear;
      month.month = monthIndex;
      this.months.push(month);
    }
      
    this.startMonth = this.months[0];
    this.cows = new HerdBooleans();   

    this.modalRef = this.modal.show(template, {class: 'small'});
  }

  goToStockDetails(){
    this.feedplan.createNewFeedPlan(this.account.sessionValue.farm.id, this.startMonth, this.cows);
    this.close();
  }

  close(){
    this.modalRef.hide();
  }

  startFeedplan() {
   
  }

  stockFeedingInstructions() {
    if (
      !this.hasFeedplan ||
      !this.feedplan.feedplanValue.scenario.valid[0] ||
      !this.feedplan.feedplanValue.scenario.valid[1] ||
      !this.feedplan.feedplanValue.scenario.valid[2] ) 
      {
        this.showMessage();
        return;
      }
      //this.router.navigate(['farms', this.farm.farmValue.farmId, 'report', '', ]);
    
      //this.router.navigate(['farms', this.farm.farmValue.farmId, 'feed-instructions']);
  }

  showFeedPlanBudgetReport() {
    if (
      !this.hasFeedplan ||
      !this.feedplan.feedplanValue.scenario.valid[0] ||
      !this.feedplan.feedplanValue.scenario.valid[1] ||
      !this.feedplan.feedplanValue.scenario.valid[2] ) 
      {
        this.showMessage();
        return;
      }
      this.router.navigate(['farms', this.farm.farmValue.id, 'report', 'none', 0, 'budget']);
  }

  renameFeedplan() {
    // vm.editName = false;
    // feedplanService.saveFeedPlan(vm.farmId).then(
    //   function(success){
    //   },
    //   function (failure){

    //   });
  }

  showMessage() {
    // $modal.open({
    //     templateUrl: 'app/message/message.html',
    //     controller: 'MessageController',
    //     controllerAs: 'vm',
    //     windowClass: 'dynamic small',
    //     resolve: {
    //       title: function() {
    //         return 'Feed Plan Incomplete';
    //       },
    //       message: function() {
    //         return 'Your feed plan requires some more information before it is ready to be implemented. You can only view the budget report and stock feed instructions once your feed plan is completed.';
    //       }
    //     }
    //   }
    // );
  }
}
import { Component, OnInit, Input } from '@angular/core';
import { FeedplanService } from '../_services/feedplan.service';
import { FarmService } from '../_services/farm.service';
import { Diet } from '../_models/diet.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-stock-feeding-instructions',
  templateUrl: './stock-feeding-instructions.component.html',
  styleUrls: ['./stock-feeding-instructions.component.scss']
})

export class StockFeedingInstructionsComponent implements OnInit {

  cowType: string;
  month: string;

  editName: boolean = false;
  feedInstructionsName: string = '';

  diet: Diet;

  constructor(
    private modal: ModalService,
    public farm: FarmService,
    public feedplan: FeedplanService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cowType = route.parent.snapshot.paramMap.get("cowType");
    this.month = route.parent.snapshot.paramMap.get("month");
  }

  ngOnInit() {
    this.setFeedPlanName();
  }

  setFeedPlanName() {
    if (!this.feedplan.feedplanValue.scenario.stockDetails[this.month].feedInstructionNames) {
      this.feedplan.feedplanValue.scenario.stockDetails[this.month].feedInstructionNames = {
        milkers: '',
        dry: '',
        transition: ''
      };
    }

    if (!this.feedplan.feedplanValue.scenario.stockDetails[this.month].feedInstructionNames[this.cowType]) {
      this.feedplan.feedplanValue.scenario.stockDetails[this.month].feedInstructionNames[this.cowType] = '';
    }

    if (this.feedplan.feedplanValue.scenario.stockDetails[this.month].feedInstructionNames[this.cowType] === '') {
      this.feedplan.feedplanValue.scenario.stockDetails[this.month].feedInstructionNames[this.cowType] = this.feedplan.feedplanValue.scenario.stockDetails[this.month].numberOfAnimals[this.cowType] + ' ' + this.cowType + ' - ' + this.feedplan.feedplanValue.scenario.stockDetails[this.month].month;
    }

    this.feedInstructionsName = this.feedplan.feedplanValue.scenario.stockDetails[this.month].feedInstructionNames[this.cowType];
  }

  editInstructions(index: number, template: any) {
    var comments = this.feedplan.feedplanValue.scenario.stockDetails[this.month].diet[index][this.cowType].comment;
    this.modal.show(template);
    // var modalInstance = $modal.open({
    //     templateUrl: 'app/stock-feeding-instructions-edit/stock-feeding-instructions-edit.html',
    //     controller: 'StockFeedingInstructionsEditController',
    //     controllerAs: 'vm',
    //     windowClass: 'medium',
    //     resolve: {
    //       comment: function() {
    //         return comments;
    //       }
    //     }
    // });

    // modalInstance.result.then(
    //     function(result) { // close?
    //         this.feedplan.feedplanValue.scenario.stockDetails[this.month].diet[index][this.cowType].comment = result;

    //         $q.all(this.save());
    //     },
    //     function() { // cancel?

    //     }
    // );
  }

  renameFeedPlan() {
    this.editName = false;
    // set the name of the feedplan to the name set by the edit:
    this.feedplan.feedplanValue.scenario.stockDetails[this.month].feedInstructionNames[this.cowType] = this.feedInstructionsName;
    this.save();
  }

  save() {
    this.feedplan.saveFeedPlan();
  }

  close() {
    this.router.navigate(['farms', this.farm.farmValue.id, 'feed-plan']);
  }
}
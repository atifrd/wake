import { Component, OnInit } from '@angular/core';
import { FeedplanService } from '../_services/feedplan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmService } from '../_services/farm.service';

@Component({
  selector: 'app-feed-plan-report',
  templateUrl: './feed-plan-report.component.html',
  styleUrls: ['./feed-plan-report.component.sass']
})

export class FeedPlanReportComponent implements OnInit {

  cowType: string;
  month: number;

  constructor(
    public feedplan: FeedplanService,
    private farm: FarmService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(parameters => {
      this.cowType = parameters.cowType;
      this.month = parameters.month;
    });
   }

  ngOnInit() {
  }

  pushMetrics( )
  {
  }
}
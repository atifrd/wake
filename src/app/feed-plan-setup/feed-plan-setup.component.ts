import { Component, OnInit } from '@angular/core';
import { FarmService } from '../_services/farm.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-feed-plan-setup',
  templateUrl: './feed-plan-setup.component.html',
  styleUrls: ['./feed-plan-setup.component.scss']
})

export class FeedPlanSetupComponent implements OnInit {

  state = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private farm: FarmService
  ) {
  }

  ngOnInit() {
    this.setCurrentState();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setCurrentState();
      }
    });
  }

  private setCurrentState() {
    this.state = this.route.firstChild.routeConfig.path;
  }

  close() {
    this.router.navigate(['feed-plan', this.farm.farmValue.id]);
  }
}
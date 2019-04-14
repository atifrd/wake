import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  private subscription: Subscription;
  message: any;
  dismissible: boolean = true;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  dismiss() {
    this.alertService.dismiss();
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.sass']
})

export class UnsubscribeComponent implements OnInit, OnDestroy {

  complete: boolean = false;
  message: string = "Unsubscribing...";
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => { 
      this.userId = params.userId;
      this.unsubscribe();
    });
  }

  ngOnDestroy() { }
  
  unsubscribe() {
    // this.accountService.unsubscribe(this.userId)
    //   .subscribe(data => {
    //     this.complete = data;
    //     this.message = 'You have been unsubscribed from all Dairy Feed Tools email notifications.';
    //   }
    // );  
  }
}
import { AccountService } from '../_services/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountNotificationsEditComponent } from '../account-notifications-edit/account-notifications-edit.component';
import { ModalService } from '../_services/modal.service';
import { BsModalService } from 'ngx-foundation';

@Component({
  selector: 'app-account-notifications',
  templateUrl: './account-notifications.component.html',
  styleUrls: ['./account-notifications.component.sass']
})

export class AccountNotificationsComponent implements OnInit, OnDestroy {

  dialogResult: any;

  constructor(
    private modal: ModalService,
    //private modal: BsModalService,
    public account: AccountService
  ) { }

  ngOnInit() {
    this.account.getUserProfile();
  }

  ngOnDestroy() {
  }
  editNotificationDetails() {
    this.modal.show(AccountNotificationsEditComponent, '', {
      width: '600px',
      data: 'This text is passed into the dialog!'
    }).subscribe((result) => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
    // .then(result => {
    //   console.log(`Dialog closed: ${result}`);
    //   this.dialogResult = result;
    // });
  }
  // editNotificationDetails() {
  //   this.modal.show(AccountNotificationsEditComponent, '', {
  //     width: '600px',
  //     data: 'This text is passed into the dialog!'
  //   }).then(result => {
  //     console.log(`Dialog closed: ${result}`);
  //     this.dialogResult = result;
  //   });
  // }
}
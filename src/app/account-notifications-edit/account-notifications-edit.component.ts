import { Component, OnInit, ElementRef, OnDestroy, Inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { UserProfile } from '../_models/user.models';
import { Subscription } from 'rxjs';
import { BsModalRef } from 'ngx-foundation/modal';
import { ModalService } from '../_services/modal.service';


@Component({
  selector: 'app-account-notifications-edit',
  templateUrl: './account-notifications-edit.component.html',
  styleUrls: ['./account-notifications-edit.component.sass']
})

export class AccountNotificationsEditComponent implements OnInit, OnDestroy {

  profile: UserProfile;
  profileSubscription: Subscription;
  paramFromParent: string;
  resultForParent: string = "";
  constructor(
    public modalService: ModalService,
    public accountService: AccountService) {
  }

  ngOnInit() {
    this.profileSubscription = this.accountService.profile.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }

  save() {
    this.accountService.updateNotificationSettings(this.profile);
    this.close();
  }

  close() {
    this.resultForParent = "confirm";
    this.modalService.hide();
  }

  cancel() {
    this.resultForParent = "cancel";
    this.modalService.hide();
  }
}
import { Component, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.sass']
})

export class AccountDetailsComponent {

  constructor(
    private modalService: ModalService,
    public account: AccountService

  ) 
  {
    this.account.getUserProfile();
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.show(template, 'small');
  }
  
}
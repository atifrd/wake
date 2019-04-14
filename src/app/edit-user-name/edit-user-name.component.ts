import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-edit-user-name',
  templateUrl: './edit-user-name.component.html',
  styleUrls: ['./edit-user-name.component.sass']
})
export class EditUserNameComponent implements OnInit {

  firstName: string = "";
  lastName: string = "";

  constructor(
    private account: AccountService , private modalService : ModalService
  ) { }


  ngOnInit() {
    this.account.profile.subscribe(profile => {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
    })
  }

  close() {
    this.modalService.hide();
  }

  save() {
    this.account.updateName({firstName: this.firstName, lastName: this.lastName});
    this.close();
  }
}
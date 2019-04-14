import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { FarmUser } from '../_models/user.models';
import { FarmService } from '../_services/farm.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Farm } from '../_models/farm.models';
import { UserInvitationComponent } from '../user-invitation/user-invitation.component';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-farm-users',
  templateUrl: './farm-users.component.html',
  styleUrls: ['./farm-users.component.scss']
})

export class FarmUsersComponent implements OnInit, OnDestroy {


  constructor(
    public farm: FarmService,
    private modalService: ModalService
  ) { }

  ngOnInit() { }

  ngOnDestroy() { }

  getUserRole(role: string) : string {
    switch (role) {
      case 'administrator':
        return 'Farm Administrator';
      case 'feed-planning':
        return 'Diet Consultant';
      case 'feed-supply':
        return 'Feed Supplier';
      default:
        throw Error('Unrecognised role type');
    }
  }

  inviteUser(template: TemplateRef<any>) {
     this.modalService.show(template, 'small');
   }

  inviteFarmAdmin(){ 
    this.modalService.show(UserInvitationComponent);
  }

  inviteFarmNutritionist(){ 
    this.modalService.show(UserInvitationComponent);
  }

  inviteFarmSupplier(){ 
    this.modalService.show(UserInvitationComponent);
  }

  removeFarmUser(user: FarmUser){
    if (user.role === 'administrator') {
      var admins = this.farm.usersValue.filter((item) => {
        return item.role === 'administrator';
      });

      if (admins.length === 1) {
        alert('At least one administrator is required for each farm. User cannot be removed.');
        return;
      }
    }

    this.farm.removeFarmUser(this.farm.farmValue.id, user.id);
  }

  logUser(user){
    console.log("user: " + user);
  }
}
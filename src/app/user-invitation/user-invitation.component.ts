import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FarmService } from '../_services/farm.service';
import { Farm } from '../_models/farm.models';
import { Subscription } from 'rxjs';
import { ModalService } from '../_services/modal.service';
import { InvitedUser } from '../_models/user.models';

@Component({
  selector: 'app-user-invitation',
  templateUrl: './user-invitation.component.html',
  styleUrls: ['./user-invitation.component.sass']
})
export class UserInvitationComponent implements OnInit {

  farm: Farm;
  farmSubscription: Subscription;

  invitation: InvitedUser;

  roleDescription: any;

  selectedRoleTitle : string = '';
  selectedRoleDescription : string = '';
  
  @Input() set selectedRole(_role: any) {
    this.selectedRoleTitle = this.roleDescription[_role].title;
    this.selectedRoleDescription = this.roleDescription[_role].description;
  }


  constructor(private farmService: FarmService , private modalService : ModalService) { 
    
    this.invitation = new InvitedUser();
    this.invitation.role = 'administrator';

    this.roleDescription = {
      'administrator': {
        title: 'Farm Administrator',
        description: 'A farm administrator is a user who can edit farm details, manage the farm feed plan and manage feed inventory. This access level is suitable for people you employ on your farm.'
      },
      'feed-planning': {
          title: 'Diet Consultant',
          description: 'Add diet consultant is a user who can manage the farm feed plan. This access level is suitable for external consultants you engage to help you manage your feed plan.'
      },
      'feed-supply': {
          title: 'Feed Supplier',
          description: 'A feed supplier is a user who can access feed inventory to record delivery details only (they can\'t access the full feed inventory details or perform stocktakes). This access level is suitable for external feed supply contractors.'
      }
    };
  }

  ngOnInit() {
    this.farmSubscription = this.farmService.farm.subscribe(farm => {
      this.farm = farm;
    });
  }

  isFormValid() {
    return this.invitation.email != "" && this.invitation.firstName != "" && this.invitation.lastName != "";

  }

  get roleInfo(){
      return this.roleDescription[this.invitation.role];
  }

  save() {
    console.log("Sending the user invitation");
    this.farmService.inviteUserToFarm(this.farm.id, this.invitation);
  }

  close() {
    this.modalService.hide();
  }

  cancel() {
    this.close();
  }
}

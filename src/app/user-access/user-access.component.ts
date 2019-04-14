import { Component, OnInit, OnDestroy } from '@angular/core';
import { FarmUser } from '../_models/user.models';
import { FarmService } from '../_services/farm.service';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.sass']
})

export class UserAccessComponent implements OnInit, OnDestroy {

  constructor(
    private farmService: FarmService
  ) { }

  ngOnInit() { }

  ngOnDestroy() { }

  inviteFarmAdmin(){
    this.inviteFarmUser('administrator');
  }

  inviteFarmNutritionist(){
    this.inviteFarmUser('feed-planning');
  }

  inviteFarmSupplier(){
    this.inviteFarmUser('feed-supply');
  }

  inviteFarmUser(role: string){
      // var modalInstance = $modal.open({
      //     templateUrl: 'app/user-invitation/user-invitation.html',
      //     controller: 'UserInvitationController',
      //     controllerAs: 'vm',
      //     windowClass: 'medium',
      //     resolve: {
      //         farmId: function() {
      //             return vm.farmId;
      //         },
      //         role: function(){
      //             return role;
      //         }
      //     }
      // });
  }

  getUserRole(role: string){
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

  removeFarmUser(user: FarmUser){
    if (user.role === 'administrator') {
      // var admins = this.farmService.users.filter(farmUser => farmUser.role === 'administrator');

      // if (admins.length === 1) {
      //   alert('At least one administrator is required for each farm. User cannot be removed.');
      //   return;
      // }
    }

    // this.farmService.removeFarmUser(this.farmId, user.id)
    //   .subscribe(data => {
    //     const index: number = this.farmUsers.indexOf(user);
    //     this.farmUsers.splice(index, 1);
    //   }
    // );
  }
}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { FeedPlanComponent } from './feed-plan/feed-plan.component';
import { InventoryManagerComponent } from './inventory-manager/inventory-manager.component';
import { FarmComponent } from './farm/farm.component';
import { FarmDetailsComponent } from './farm-details/farm-details.component';
import { FarmUsersComponent } from './farm-users/farm-users.component';
import { FarmSettingsComponent } from './farm-settings/farm-settings.component';
import { AboutComponent } from './about/about.component';

import { AuthGuard } from './_guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { from } from 'rxjs';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountNotificationsComponent } from './account-notifications/account-notifications.component';
import { FeedPlanSetupComponent } from './feed-plan-setup/feed-plan-setup.component';
import { EditStockDetailsComponent } from './edit-stock-details/edit-stock-details.component';
import { EditFeedTypesComponent } from './edit-feed-types/edit-feed-types.component';
import { EditDietComponent } from './edit-diet/edit-diet.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { StockFeedingInstructionsComponent } from './stock-feeding-instructions/stock-feeding-instructions.component';
import { BudgetReportingComponent } from './budget-reporting/budget-reporting.component';
import { StorageDetailsComponent } from './storage-details/storage-details.component';
import { FeedPlanReportComponent } from './feed-plan-report/feed-plan-report.component';
import { StorageComponent } from './storage/storage.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent  },
  { path: 'signin', component: SigninComponent  },
  { path: 'request-password-reset', component: RequestPasswordResetComponent  },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'details', pathMatch: 'prefix' },
    { path: 'details', component: AccountDetailsComponent, canActivate: [AuthGuard] },
    { path: 'notifications', component: AccountNotificationsComponent, canActivate: [AuthGuard] }
  ]},
  { path: 'farms/:id/feed-plan', component: FeedPlanComponent, canActivate: [AuthGuard]  },
  { path: 'farms/:id/feed-plan/setup', component: FeedPlanSetupComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'stock', pathMatch: 'prefix' },
    { path: 'stock', component: EditStockDetailsComponent, canActivate: [AuthGuard] },
    { path: 'feed', component: EditFeedTypesComponent, canActivate: [AuthGuard] },
    { path: 'diet', component: EditDietComponent, canActivate: [AuthGuard] }
  ] },
  { path: 'farms/:id/report/:cowType/:month', component: FeedPlanReportComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'instructions', pathMatch: 'prefix' },
    { path: 'instructions', component: StockFeedingInstructionsComponent, canActivate: [AuthGuard]  },
    { path: 'budget', component: BudgetReportingComponent, canActivate: [AuthGuard] }
  ] },
  { path: 'farms/:id/inventory', component: InventoryManagerComponent, canActivate: [AuthGuard]  },
  { path: 'farms/:id/storage/:storagefacilityid', component: StorageComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'details', pathMatch: 'prefix' },
    { path: 'details', component: StorageDetailsComponent, canActivate: [AuthGuard] }
  ] },
  { path: 'farms/:id', component: FarmComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'details', pathMatch: 'prefix' },
    { path: 'users', component: FarmUsersComponent, canActivate: [AuthGuard]  },
    { path: 'details', component: FarmDetailsComponent, canActivate: [AuthGuard]  },
    { path: 'settings', component: FarmSettingsComponent, canActivate: [AuthGuard]  },  
  ] },
  { path: 'about', component: AboutComponent  },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
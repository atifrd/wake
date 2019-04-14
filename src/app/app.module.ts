import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountNotificationsComponent } from './account-notifications/account-notifications.component';
import { AccountNotificationsEditComponent } from './account-notifications-edit/account-notifications-edit.component';
import { AddFeedTypeComponent } from './add-feed-type/add-feed-type.component';
// import { AddStorageFacilityComponent } from './add-storage-facility/add-storage-facility.component';
import { BudgetReportingComponent } from './budget-reporting/budget-reporting.component';
import { ChooseFarmComponent } from './choose-farm/choose-farm.component';
import { EditDietComponent } from './edit-diet/edit-diet.component';
import { EditDietDetailsComponent } from './edit-diet-details/edit-diet-details.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { EditFarmDetailsComponent } from './edit-farm-details/edit-farm-details.component';
import { EditFarmSettingsComponent } from './edit-farm-settings/edit-farm-settings.component';
import { EditFeedTypesComponent } from './edit-feed-types/edit-feed-types.component';
import { EditFeedtypeDetailsComponent } from './edit-feedtype-details/edit-feedtype-details.component';
import { EditForageAvailabilityComponent } from './edit-forage-availability/edit-forage-availability.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { EditStockDetailsComponent } from './edit-stock-details/edit-stock-details.component';
import { EditUserNameComponent } from './edit-user-name/edit-user-name.component';
import { FarmComponent } from './farm/farm.component';
import { FarmDetailsComponent } from './farm-details/farm-details.component';
import { FarmSettingsComponent } from './farm-settings/farm-settings.component';
import { FeedPlanComponent } from './feed-plan/feed-plan.component';
import { FeedPlanReportComponent } from './feed-plan-report/feed-plan-report.component';
import { FeedPlanSetupComponent } from './feed-plan-setup/feed-plan-setup.component';
import { HelpComponent } from './help/help.component';
import { InventoryManagerComponent } from './inventory-manager/inventory-manager.component';
import { AddStorageFacilityComponent } from './inventory-manager/addStorageFacility.component';
import { MessageComponent } from './message/message.component';
import { RecordDeliveryComponent } from './record-delivery/record-delivery.component';
import { RecordStocktakeComponent } from './record-stocktake/record-stocktake.component';
import { RegisterInvitationComponent } from './register-invitation/register-invitation.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { ResetComponent } from './reset/reset.component';
import { StartFeedPlanComponent } from './start-feed-plan/start-feed-plan.component';
import { StockFeedingInstructionsComponent } from './stock-feeding-instructions/stock-feeding-instructions.component';
import { StockFeedingInstructionsEditComponent } from './stock-feeding-instructions-edit/stock-feeding-instructions-edit.component';
import { StockFeedingInstructionsSelectComponent } from './stock-feeding-instructions-select/stock-feeding-instructions-select.component';
import { StorageComponent } from './storage/storage.component';
import { StorageDeliveryHistoryComponent } from './storage-delivery-history/storage-delivery-history.component';
import { StorageDetailsComponent } from './storage-details/storage-details.component';
import { StorageEditFeedrateComponent } from './storage-edit-feedrate/storage-edit-feedrate.component';
import { StorageEditNameComponent } from './storage-edit-name/storage-edit-name.component';
import { StorageFacilityDeleteComponent } from './storage-facility-delete/storage-facility-delete.component';
import { StorageManagementComponent } from './storage-management/storage-management.component';
import { StorageStocktakeHistoryComponent } from './storage-stocktake-history/storage-stocktake-history.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { UserInvitationComponent } from './user-invitation/user-invitation.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { ShellComponent } from './shell/shell.component';
import { AlertComponent } from './_components/alert/alert.component';

import { ResponseInterceptor } from './_helpers/response.interceptor';
import { RequestInterceptor } from './_helpers/request.interceptor';
import { FarmUsersComponent } from './farm-users/farm-users.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { FarmService } from './_services/farm.service';
import { FarmBackendService } from './_services/farm.backend';
import { AccountService } from './_services/account.service';
import { InventoryService } from './_services/inventory.service';
import { FeedplanService } from './_services/feedplan.service';
import { FeedCalculatorService } from './_services/feed.calculator';
import { DietCalculatorService } from './_services/diet.calculator';
import { AccountBackendService } from './_services/account.backend';
import { FeedplanBackendService } from './_services/feedplan.backend';
import { InventoryBackendService } from './_services/inventory.backend';
import { ModalComponent } from './_components/modal/modal.component';
import { ModalService } from './_services/modal.service';
import { MonthService } from './_services/month.service';
import { FeedByCategoryPipe } from './_helpers/feedbycategory.pipe';

import {
  AlertModule,        // Foundation Callouts
  ButtonsModule,
  BsDatepickerModule,
  BsDropdownModule,   // Foundation Dropdown Menus and Dropdown Panes
  ModalModule,        // Foundation Reveal
  TabsModule,
  TooltipModule,
  ModalOptions,
  BsModalRef
} from 'ngx-foundation';
import { HelpBalanceDietComponent } from './edit-diet-details/learnmore/help-balance-diet.component';
import { HelpCowAppetiteComponent } from './edit-diet-details/learnmore/help-cow-appetite.component';
import { HelpFeedWastageComponent } from './edit-diet-details/learnmore/help-feed-wastage.component';
import { HelpEditDietComponent } from './edit-diet/learnmore/help-edit-diet.component';
import { HelpCostsComponent } from './edit-feed-types/learnmore/help-costs.component';
import { HelpCrudeProteinComponent } from './edit-feed-types/learnmore/help-crude-protein.component';
import { HelpEnergyComponent } from './edit-feed-types/learnmore/help-energy.component';
import { HelpNdfComponent } from './edit-feed-types/learnmore/help-ndf.component';
import { HelpDailyGrowthRatesComponent } from './edit-forage-availability/learnmore/help-daily-growth-rates.component';
import { HelpUtilisationComponent } from './edit-forage-availability/learnmore/help-utilisation.component';
import { HelpAverageDaysInMilkComponent } from './edit-stock-details/learnmore/help-average-days-in-milk.component';
import { HelpAverageDaysPregnantComponent } from './edit-stock-details/learnmore/help-average-days-pregnant.component';
import { HelpAverageLiveweightComponent } from './edit-stock-details/learnmore/help-average-liveweight.component';
import { HelpDistanceWalkedComponent } from './edit-stock-details/learnmore/help-distance-walked.component';
import { HelpLiveweightChangeComponent } from './edit-stock-details/learnmore/help-liveweight-change.component';
import { HelpMilkFatComponent } from './edit-stock-details/learnmore/help-milk-fat.component';
import { HelpTerrainComponent } from './edit-stock-details/learnmore/help-terrain.component';
import { DiscrepancyInfoComponent } from './inventory-manager/learnmore/discrepancy-info.component';
import { FeedPickerComponent } from './inventory-manager/learnmore/feed-picker.component';
import { HelpCapacityComponent } from './inventory-manager/learnmore/help-capacity.component';
import { HelpFeedLevelBalesComponent } from './inventory-manager/learnmore/help-feed-level-bales.component';
import { HelpFeedLevelFromBackComponent } from './inventory-manager/learnmore/help-feed-level-from-back.component';
import { HelpFeedLevelFromBottomComponent } from './inventory-manager/learnmore/help-feed-level-from-bottom.component';
import { HelpWetDensityComponent } from './inventory-manager/learnmore/help-wet-density.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    AboutComponent,
    RegisterComponent,
    AccountComponent,
    AccountDetailsComponent,
    AccountNotificationsComponent,
    AccountNotificationsEditComponent,
    AddFeedTypeComponent,
    BudgetReportingComponent,
    ChooseFarmComponent,
    EditDietComponent,
    EditDietDetailsComponent,
    EditEmailComponent,
    EditFarmDetailsComponent,
    EditFarmSettingsComponent,
    EditFeedTypesComponent,
    EditFeedtypeDetailsComponent,
    EditForageAvailabilityComponent,
    EditPasswordComponent,
    EditStockDetailsComponent,
    EditUserNameComponent,
    FarmComponent,
    FarmDetailsComponent,
    FarmSettingsComponent,
    FeedPlanComponent,
    FeedPlanReportComponent,
    FeedPlanSetupComponent,
    HelpComponent,
    InventoryManagerComponent,
    AddStorageFacilityComponent,
    MessageComponent,
    RecordDeliveryComponent,
    RecordStocktakeComponent,
    RegisterInvitationComponent,
    RequestPasswordResetComponent,
    ResetComponent,
    StartFeedPlanComponent,
    StockFeedingInstructionsComponent,
    StockFeedingInstructionsEditComponent,
    StockFeedingInstructionsSelectComponent,
    StorageComponent,
    StorageDeliveryHistoryComponent,
    StorageDetailsComponent,
    StorageEditFeedrateComponent,
    StorageEditNameComponent,
    StorageFacilityDeleteComponent,
    StorageManagementComponent,
    StorageStocktakeHistoryComponent,
    TermsAndConditionsComponent,
    UnsubscribeComponent,
    UserAccessComponent,
    UserInvitationComponent,
    FooterComponent,
    NavComponent,
    ShellComponent,
    AlertComponent,
    FarmUsersComponent,
    ModalComponent,
    FeedByCategoryPipe,
    HelpBalanceDietComponent,
    HelpCowAppetiteComponent,
    HelpFeedWastageComponent,
    HelpEditDietComponent,
    HelpCostsComponent,
    HelpCrudeProteinComponent,
    HelpEnergyComponent,
    HelpNdfComponent,
    HelpDailyGrowthRatesComponent,
    HelpUtilisationComponent,
    HelpAverageDaysInMilkComponent,
    HelpAverageDaysPregnantComponent,
    HelpAverageLiveweightComponent,
    HelpDistanceWalkedComponent,
    HelpLiveweightChangeComponent,
    HelpMilkFatComponent,
    HelpTerrainComponent,
    DiscrepancyInfoComponent,
    FeedPickerComponent,
    HelpCapacityComponent,
    HelpFeedLevelBalesComponent,
    HelpFeedLevelFromBackComponent,
    HelpFeedLevelFromBottomComponent,
    HelpWetDensityComponent
  ],
  entryComponents: [
    AccountNotificationsEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MomentModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),        // Foundation Callouts
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),   // Foundation Dropdown Menus and Dropdown Panes
    ModalModule.forRoot(),        // Foundation Reveal
    TabsModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    BsModalRef,
    ModalOptions,
    FarmService,
    InventoryService,
    FeedplanService,
    FeedCalculatorService,
    DietCalculatorService,
    AccountService,
    FarmBackendService,
    AccountBackendService,
    FeedplanBackendService,
    InventoryBackendService,
    ModalService,
    MonthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, Input, OnInit, OnDestroy, TemplateRef, EventEmitter, Output, Inject } from '@angular/core';
import { FeedTypesQuantifiedValues, StorageType, StorageFacility, Task } from '../_models/inventory.models';
import { InventoryService } from '../_services/inventory.service';
import { AccountService } from '../_services/account.service';
import { FarmService } from '../_services/farm.service';
import { LookupService } from '../_services/lookup.service';
import * as _ from 'lodash';
import { ModalService } from '../_services/modal.service';
import { UserRole } from '../_models/user.models';
@Component({
  selector: 'app-add-storage-facility',
  templateUrl: './addStorageFacility.component.html'
})

export class AddStorageFacilityComponent implements OnInit, OnDestroy {

  storageFacility: StorageFacility;
  storageTypeId: string = null;
  feedTypesQuanitifiedValues: FeedTypesQuantifiedValues[];
  storageTypeList: StorageType[]
  ///TODO_4UI
  task: Task;
  @Input() set startTask(recivedTask: Task) {
    if (!recivedTask) return;
    this.task = recivedTask;
    this.configure();
    //this.task.step = recivedTask.step; 
  };

  feedTypesQuantifiedAsSelected: any;


  constructor(
    private inventory: InventoryService,
    private account: AccountService,
    private farm: FarmService,
    private modalService : ModalService,
    private lookup: LookupService) {

    ///TODO_4UI
    //this.storageFacility = new StorageFacility();
    this.inventory.storageFacility.subscribe(storagefacility => this.storageFacility = storagefacility)
    this.storageFacility.storageType = new StorageType();
    this.lookup.storageTypes.subscribe(storage => this.storageTypeList = storage)
  }

  ngOnInit() { }

  ngOnDestroy() { }

  configure() {
    this.task.steps = ['setDetails', 'setCapacity', 'setFeedType', 'setLevel', 'setFeedRate'];
    switch (this.task.step) {
      case 'setDetails':
        this.task.stepIndex = 1;
        this.task.stepTitle = 'Storage Facility';
        this.task.name = 'Storage Facility';
        this.task.isFirstStep = true;
        this.task.stepInstruction = 'Choose a feed storage type and enter the name or description of the facility.';
        break;
      case 'setDelivery':
        this.task.stepIndex = 2;
        this.task.stepTitle = 'Delivery';
        this.task.stepInstruction = 'Enter the details of the delivery.';
        break;
      case 'setCapacity':
        this.task.stepIndex = 3;
        this.task.stepTitle = 'Storage Facility';
        this.task.stepInstruction = 'Enter the capacity of the storage facility.';
        break;
      case 'setFeedType':
        this.task.stepIndex = 4;
        this.task.stepTitle = 'Storage Facility';
        this.task.stepInstruction = 'Select the type of feed to be stored in the storage facility.';
        break;
      case 'setLevel':
        this.task.stepIndex = 5;
        this.task.stepTitle = 'Storage Facility';
        this.task.stepInstruction = 'Enter the current amount of the feed stored in the facility.';
        break;
      case 'setFeedRate':
        this.task.stepIndex = 6;
        this.task.stepTitle = 'Storage Facility';
        this.task.stepInstruction = 'Enter the amount consumed and wasted for each animal type.';
        break;
    }
  }

  storageTypeSelected() {
    var me = this;
    this.storageFacility.storageType = _.find(this.storageTypeList, function (storage) { return storage.id == me.task.storageTypeId; });
  }


  goBack() {
    this.task.stepIndex = this.task.stepIndex - 1;
    this.task.step = this.task.steps[this.task.stepIndex - 1];
    this.task.isLastStep = this.task.steps.length == this.task.stepIndex + 1;
    this.task.isFirstStep = this.task.stepIndex == 0;
    this.configure();
  }

  goToNextStep() {
    this.task.step = this.task.steps[this.task.stepIndex];
    this.task.isLastStep = this.task.steps.length == this.task.stepIndex + 1;
    this.task.isFirstStep = this.task.stepIndex == 0;
    this.task.stepIndex++;
    this.configure();
  }

  isFirstStep(): boolean {
    return this.task.isFirstStep;
  }

  isLastStep(): boolean {
    return this.task.isLastStep;
  }

  isStepValid(): boolean {
    return true;
  }

  changeFeedTypesQuantified() { }
  
  openModal(template: TemplateRef<any> , cssClass : string = '') {
    this.modalService.show(template, cssClass);
  }
  
  close() {
    this.modalService.hide();
  }

  save() {
    this.inventory.save(this.storageFacility);
    this.close();
  }

  isAuthorisedForRole(role: string) {
    let roleForFarm = new UserRole();
    roleForFarm.farmId = this.farm.farmValue.id;
    roleForFarm.role = role;
    return this.account.hasRole(roleForFarm);
  }

  isAuthorisedOnlyForRole(role: string) {
    let roleForFarm = new UserRole();
    roleForFarm.farmId = this.farm.farmValue.id;
    roleForFarm.role = role;
    return this.account.hasOnlyRole(roleForFarm);
  }
}
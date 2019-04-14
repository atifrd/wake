import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ModalService } from '../_services/modal.service';
import { AbstractControl, ValidationErrors, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { getParentInjectorViewOffset } from '@angular/core/src/render3/util';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.sass']
})
export class EditPasswordComponent implements OnInit, OnDestroy {

  error: string = ""
  strength = {
    color: 'progress secondary',
    password: '',
    value: 0,
    desc: ''
  };

  editPasswordForm: FormGroup;
  editPasswordFormSubscription: Subscription;
  constructor(
    private accountService: AccountService, private modalService: ModalService, private formBuilder: FormBuilder, private alertService: AlertService
  ) { }

  ngOnInit() {
    this.editPasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, PasswordStrengthValidator]]
    })
    this.editPasswordFormSubscription = this.editPasswordForm.valueChanges.subscribe(data => this.updateOnChange());
  }


  ngOnDestroy() {
    if (this.editPasswordFormSubscription)
      this.editPasswordFormSubscription.unsubscribe();
  }

  updateOnChange() {
    let result = this.editPasswordForm.get('newPassword').errors;
    if (!result) return;

    this.strength.value = 0;
    this.strength.desc = 'POOR';
    (result["lowerCase"]) ? this.strength.value += 20 : this.strength.value += 0;
    (result["minLength"]) ? this.strength.value += 20 : this.strength.value += 0;
    (result["upperCase"]) ? this.strength.value += 20 : this.strength.value += 0;
    (result["number"]) ? this.strength.value += 20 : this.strength.value += 0;
    (result["special"]) ? this.strength.value += 20 : this.strength.value += 0;

    switch (this.strength.value) {
      case 0: this.strength.desc = '', this.strength.color = 'progress secondary'; break;
      case 20: this.strength.desc = 'POOR'; this.strength.color = 'progress alert'; break;
      case 40:
        this.strength.desc = 'AVERAGE';
        this.strength.color = 'progress alert';

        //Remove Belowe Line To Be Safer
        this.editPasswordForm.get('newPassword').setErrors(null); break;
      case 60:
        this.strength.desc = 'GOOD';
        this.strength.color = 'progress warning';
        this.editPasswordForm.get('newPassword').setErrors(null); break;
      case 80:
        this.strength.desc = 'VERY GOOD';
        this.strength.color = 'progress success';
        this.editPasswordForm.get('newPassword').setErrors(null); break;
      case 100:
        this.strength.color = 'progress success';
        this.strength.desc = 'EXCELLENT'; this.editPasswordForm.get('newPassword').setErrors(null); break;
    }
  }


  save() {
    this.accountService.updatePassword(
      {
        currentPassword: this.editPasswordForm.controls.currentPassword.value,
        newPassword: this.editPasswordForm.controls.newPassword.value
      })
      .subscribe(
        (result: any) => {
          var success = false;
          //TODO-Hamish: What UpdatePassword Api returns for success or failed update?
          // if (result.errorCode == "invalid_password") {
          //   this.vm.error = "Could not update password. Current password was incorrect.";
          // }
          this.alertService.success('Password Updated Successfully')
          this.modalService.hide();
        },
        (error) => {
          this.alertService.error(`Could not update password : ${error}`)
          this.modalService.hide();
        }
      );
  }

  onStrengthChange() {

  }

  close() {
    this.modalService.hide();
  }
}


export const PasswordStrengthValidator = function (control: AbstractControl): Array<{ [key: string]: boolean }> | null {

  let value: string = control.value || '';
  const requirements: Array<{ [key: string]: boolean }> = [
    { "upperCase": false },
    { "lowerCase": false },
    { "number": false },
    { "minLength": false },
    { "special": false }];

  if (!value) {
    return null
  }

  requirements["minLength"] = value.length > 7;

  let upperCaseCharacters = /[A-Z]+/g
  requirements["upperCase"] = upperCaseCharacters.test(value)

  let lowerCaseCharacters = /[a-z]+/g
  requirements["lowerCase"] = lowerCaseCharacters.test(value)

  let numberCharacters = /[0-9]+/g
  requirements["number"] = numberCharacters.test(value);

  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  requirements["special"] = specialCharacters.test(value);

  return requirements;
}


/*
import {Component} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './modal-basic.html'
})
export class NgbdModalBasic {
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
*/

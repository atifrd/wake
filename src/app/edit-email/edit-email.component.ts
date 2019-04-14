import { Component, OnInit} from '@angular/core';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.sass']
})
export class EditEmailComponent implements OnInit {

  editEmailForm: FormGroup;

  constructor(
    private account: AccountService,
    public alert: AlertService,
    private formBuilder: FormBuilder,
    private modalService : ModalService
  ) {
  }

  ngOnInit() {
    this.editEmailForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  save() {
    if (this.editEmailForm.invalid)
      return;

    this.account.updateEmail({ email: this.editEmailForm.controls.email.value, password: this.editEmailForm.controls.password.value });
    this.close();
  }

  close() {
    this.modalService.hide();
  }
}
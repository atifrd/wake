import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.sass']
})

export class RequestPasswordResetComponent implements OnInit {

  data = {
    message: "",
    sent: false,
  };

  requestPasswordForm: FormGroup;

  constructor(private accountService: AccountService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.requestPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  requestPasswordReset() {
    this.data.message = ``;
    if (this.requestPasswordForm.invalid) {
      this.requestPasswordForm.controls.email.markAsTouched();
      this.data.message = `Enter valid email address.`;
      return;
    }

    var email = this.requestPasswordForm.controls.email.value;
    this.accountService.requestPasswordReset({ email: email })
      .toPromise()
      .then(
        success => {
          this.data.sent = true;
          this.data.message = `An email has been sent to ${email}`;
        },
        error => {
          this.data.sent = false;
          if (error.data.errorCode === 'invalid_email') {
            this.data.message = 'The email address is not assocaited with any Dairy Feed Tools accounts. Try another email address.';
          } else {
            this.data.message = 'An error occurred, please contact Dairy Feed Tools support.';
          }
        }
      );
  }
}

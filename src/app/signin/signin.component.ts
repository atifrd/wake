import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { UserSession, UserProfile } from '../_models/user.models';
import { AlertService } from '../_services/alert.service';
import { Subscription } from 'rxjs';
import { FarmService } from '../_services/farm.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})

export class SigninComponent implements OnInit, OnDestroy {

  session: UserSession;
  sessionSubscription: Subscription;

  profile: UserProfile;
  profileSubscription: Subscription;


  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private farm: FarmService
  ) { 
    // redirect to home if already logged in
    if (this.accountService.sessionValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.f.username.value, this.f.password.value)
        //.pipe(first())
        .subscribe(
            data => {
              console.log("We logged in:", data);
              this.farm.loadFarm(data.farm.id);
              this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error('Incorrect email address or password.');
                this.loading = false;
            });
  }

  resetPassword() {
    this.router.navigate(['/request-password-reset']);
  }
  ngOnDestroy() {

  }
}
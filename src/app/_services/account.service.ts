import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticatedUser, UserSession, UserRole, UserProfile } from '../_models/user.models';
import { environment } from '../../environments/environment';
import { RegisterUser } from '../_reqiests/user.requests';
import { AccountBackendService } from './account.backend';
import { AlertService } from './alert.service';
import { Session } from 'protractor';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AccountService {

    session: Observable<UserSession>;
    private _session: BehaviorSubject<UserSession>;
    
    profile: Observable<UserProfile>;
    private _profile: BehaviorSubject<UserProfile>;

    private dataStore: {
        session: UserSession,
        profile: UserProfile
    };

    constructor(
        private accountApi: AccountBackendService,
        private alert: AlertService,
        private router: Router
        ) 
    {
        console.log('AccountService:Constructor');

        this.dataStore = {
            session: new UserSession(),
            profile: new UserProfile()
        };

        this._session = new BehaviorSubject<UserSession>(JSON.parse(localStorage.getItem('currentUser')));
        this.session = this._session.asObservable();

        this._profile = <BehaviorSubject<UserProfile>>new BehaviorSubject(new UserProfile());
        this.profile = this._profile.asObservable();
    }

    public get sessionValue(): UserSession {
        return this._session.value;
    }

    public get profileValue(): UserProfile {
        return this._profile.value;
    }

    login(email: string, password: string) {
        return this.accountApi.authenticate({ email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.accessToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.dataStore.session = new UserSession(user);
                    this.dataStore.session.accessToken = user.accessToken;
                    this.dataStore.session.refreshToken = user.refreshToken;
                    
                    this._session.next(Object.assign({}, this.dataStore).session);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.dataStore.session = null;
        this._session.next(Object.assign({}, this.dataStore).session); 
    }

    register(request: RegisterUser){
        return this.accountApi
            .register(request)
            .subscribe(user => {
                console.log(`user regisration created: ${user.accessToken}`);
                if(user && user.accessToken) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.dataStore.session = new UserSession(user);
                    this._session.next(Object.assign({}, this.dataStore).session);   
                    this.router.navigate(['home']);
                }
            });
    }

    getUserProfile() {
        this.accountApi
            .getUserProfile()
            .subscribe(
                data => {
                    this.dataStore.profile = new UserProfile(data);
                    this._profile.next(Object.assign({}, this.dataStore).profile);
                },
                error => this.alert.handleError(error)
            );
    }

    // /// LOGIC
    getRoles() {
        return this.sessionValue.user.roles;
    }

    hasRole(userRole: UserRole): boolean {
        return this
            .getRoles()
            .find(role =>  
                role.farmId == userRole.farmId && 
                (role.role == userRole.role || role.role == 'administrator')
            ) != undefined; 
    }

    hasOnlyRole(userRole: UserRole): boolean{
        return this.getRoles()
            .find(role => role.farmId == userRole.farmId && role.role == userRole.role) != undefined;        
    }

    // /// API
    // loadInvitation(invitationId: string){
    //     return this.http.get<any>(`${environment.apiUrl}/accounts/invitation/${invitationId}`)
    //         .pipe(catchError(this.handleError));
    // }

    getNotificationSettings() {
        this.accountApi
            .getNotificationSettings()
            .subscribe(
                data => {
                    this.dataStore.profile = new UserProfile(data);
                    this._profile.next(Object.assign({}, this.dataStore).profile);
                },
                error => this.alert.handleError(error)
            );
    }

    updateNotificationSettings(request: UserProfile) {
        this.accountApi
            .updateNotificationSettings(request)
            .subscribe(
                data => {
                    this.dataStore.profile = new UserProfile(data);
                    this._profile.next(Object.assign({}, this.dataStore).profile);
                },
                error => this.alert.handleError(error)
            );
    }

    unsubscribe(userId: string) {
        return this.accountApi.unsubscribe(userId);
    }

    // feedReportMetrics(request: any) {
    //     return this.http.put<any>(`${environment.apiUrl}/metrics/feedreport-viewed`, request)
    //         .pipe(catchError(this.handleError));
    // }

    // budgetReportMetrics(request: any) {
    //     return this.http.put<any>(`${environment.apiUrl}/metrics/budgetreport-viewed`, request)
    //         .pipe(catchError(this.handleError));
    // }

    updatePassword(request: any) {
      return this.accountApi.updatePassword(request);
    }

    updateEmail(request: any) {
        this.accountApi
        .updateEmail(request)
        .subscribe(
            data => {
                this.dataStore.profile.email = data.email;
                this._profile.next(Object.assign({}, this.dataStore).profile);
            },
            error => this.alert.handleError(error)
        );
    }

    updateName(request: any) {
      // return this.accountApi.updateName(request);
      this.accountApi
            .updateName(request)
            .subscribe(
                data => {
                    this.dataStore.profile.firstName = data.firstName;
                    this.dataStore.profile.lastName = data.lastName;
                    this._profile.next(Object.assign({}, this.dataStore).profile);
                },
                error => this.alert.handleError(error)
            );
    }

    updateTimezone(request: any) {
      return this.accountApi.updateTimezone(request);
    }

    requestPasswordReset(request: any) {
      return this.accountApi.requestPasswordReset(request);
    }

    resetPassword(request: any) {
      return this.accountApi.resetPassword(request);
    }
}
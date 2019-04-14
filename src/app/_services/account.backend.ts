
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserSession, UserProfile } from '../_models/user.models';
import { RegisterUser, AuthenticateUser } from '../_reqiests/user.requests';

@Injectable()

export class AccountBackendService {

    constructor(private http:HttpClient){}

    getProfile() {
        return this.http.get<UserProfile>(`${environment.apiUrl}/accounts/profile`);
    }

    register(request: RegisterUser){
        return this.http.post<any>(`${environment.apiUrl}/accounts/register`, request);
    }

    authenticate(request: AuthenticateUser) {
        return this.http.post<any>(`${environment.apiUrl}/accounts/authenticate`, request);
    }

    loadInvitation(invitationId: string){
        return this.http.get<any>(`${environment.apiUrl}/accounts/invitation/${invitationId}`);
    }

    getNotificationSettings(){
        return this.http.get<UserProfile>(`${environment.apiUrl}/accounts/notifications`);
    }

    updateNotificationSettings(request: UserProfile){
        // returns notifyDeliveries, notifyFeedplan, notifyStocktake, notifyFeedRunout from API
        return this.http.put<UserProfile>(`${environment.apiUrl}/accounts/notifications`, request);
    }

    unsubscribe(userId: string) {
        return this.http.put<any>(`${environment.apiUrl}/accounts/unsubscribe/${userId}`, userId);
    }

    feedReportMetrics(request: any) {
        return this.http.put<any>(`${environment.apiUrl}/metrics/feedreport-viewed`, request);
    }

    budgetReportMetrics(request: any) {
        return this.http.put<any>(`${environment.apiUrl}/metrics/budgetreport-viewed`, request);
    }

    getUserProfile(){
        return this.http.get<UserProfile>(`${environment.apiUrl}/accounts/profile`);
    }

    updatePassword(request: any) {
        // returns only 200 OK header from API
      return this.http.put(`${environment.apiUrl}/accounts/password`, request);
    }

    updateEmail(request: any) {
        // returns new email from API
      return this.http.put<UserProfile>(`${environment.apiUrl}/accounts/email`, request);
    }

    updateName(request: any) {
        // returns new firstName, lastName from API
      return this.http.put<UserProfile>(`${environment.apiUrl}/accounts/name`, request);
    }

    updateTimezone(request: any) {
      return this.http.put(`${environment.apiUrl}/accounts/timezone`, request);
    }

    requestPasswordReset(request: any) {
      return this.http.post(`${environment.apiUrl}/accounts/reset`, request);
    }

    resetPassword(request: any) {
      return this.http.put(`${environment.apiUrl}/accounts/reset`, request);
    }
}
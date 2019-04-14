import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountService } from '../_services/account.service';
import { UserSession } from '../_models/user.models';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private account: AccountService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let session = this.account.sessionValue;
        if (session && session.accessToken) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${session.accessToken}`
                }
            });
        }

        return next.handle(request);
    }
}
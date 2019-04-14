import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Feedplan, Scenario } from '../_models/feedplan.models';


@Injectable()

export class FeedplanBackendService {

    constructor(private http:HttpClient){}

    get(farmid: string) {
        return this.http.get<any>(`${environment.apiUrl}/farms/${farmid}/feedplan`);
    }

    create(farmid:string, feedplan:Feedplan) {
        return this.http.post<Feedplan>(`${environment.apiUrl}/farms/${farmid}/feedplans`, {feedPlan: feedplan.scenario});
    }

    update(farmid:string, feedplanid: string, feedplan: Feedplan) {        
        return this.http.put<Feedplan>(`${environment.apiUrl}/farms/${farmid}/feedplans/${feedplanid}`, {feedPlan: feedplan.scenario});
    }

    delete(farmid: string, feedplanid:string) {
        return this.http.delete(`${environment.apiUrl}/farms/${farmid}/feedplans/${feedplanid}`);     
    }
}
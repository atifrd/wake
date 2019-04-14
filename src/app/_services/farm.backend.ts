import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Farm, FarmSettings } from '../_models/farm.models';
import { environment } from 'src/environments/environment';
import { FarmUser, InvitedUser } from '../_models/user.models';
import { InviteUser } from '../_reqiests/user.requests';


@Injectable()

export class FarmBackendService {

    constructor(private http:HttpClient){}

    getFarm(farmid: string) {
        return this.http.get<Farm>(`${environment.apiUrl}/farms/${farmid}`);
    }

    getFarms() {
        return this.http.get<Array<Farm>>(`${environment.apiUrl}/farms`);
    }

    update(farm: Farm) { 
        var payload = {
            farmId: farm.id,
            farmName: farm.farmName,
            location: farm.location,
            ownerName: farm.ownerName,
            managerName: farm.managerName,
            address: farm.address
        };
        return this.http.put(`${environment.apiUrl}/farms/${farm.id}`, payload);
    }

    getSettings(farmid: string) {
        return this.http.get<FarmSettings>(`${environment.apiUrl}/farms/${farmid}/settings`);
    }

    updateSettings(farmid: string, farm: FarmSettings){
        return this.http.put<FarmSettings>(`${environment.apiUrl}/farms/${farmid}/settings`, JSON.stringify(farm));
    }

    getUsers(farmid: string){
        return this.http.get<Array<FarmUser>>(`${environment.apiUrl}/farms/${farmid}/users`);
    }

    getUser(farmid: string, userid: string){
        return this.http.get<FarmUser>(`${environment.apiUrl}/farms/${farmid}/users/${userid}`);
    }

    updateFarmUser(farmid:string, userid: string, farmUser:FarmUser){
        return this.http.put<FarmUser>(`${environment.apiUrl}/farms/${farmid}/users/${userid}`, JSON.stringify(farmUser));
    }

    removeFarmUser(farmid: string, farmuserid:string) {   
        return this.http.delete(`${environment.apiUrl}/farms/${farmid}/users/${farmuserid}`);
    }

    inviteUser(farmid: string, farmUser: any){
        return this.http.post<FarmUser>(`${environment.apiUrl}/farms/${farmid}/users/`, JSON.stringify(farmUser));
    }
}
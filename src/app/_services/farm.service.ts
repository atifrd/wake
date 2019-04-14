import { Injectable } from '@angular/core';
import { Farm, FarmSettings } from '../_models/farm.models';
import { FarmUser, UserProfile, InvitedUser, UserSession } from '../_models/user.models';
import { Subscription, Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { FarmBackendService } from './farm.backend';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})

export class FarmService {

  farm: Observable<Farm>;
  private _farm: BehaviorSubject<Farm>;
  
  users: Observable<Array<FarmUser>>;
  private _users: BehaviorSubject<Array<FarmUser>>;
  
  user: Observable<FarmUser>;
  private _user: BehaviorSubject<FarmUser>;

  settings: Observable<FarmSettings>;
  private _settings: BehaviorSubject<FarmSettings>;
  
  private dataStore: {
    farm: Farm,
    users: Array<FarmUser>,
    settings: FarmSettings,
    user: FarmUser
  };

  constructor(
    private farmApi: FarmBackendService,
    private alertService: AlertService
  ) 
  {
    console.log('FarmService:Constructor');

    this.dataStore = { 
      farm: new Farm(), 
      users:[], 
      settings: new FarmSettings(),
      user: null
    };

    this._farm = <BehaviorSubject<Farm>>new BehaviorSubject(new Farm());
    this.farm = this._farm.asObservable();

    this._users = <BehaviorSubject<FarmUser[]>>new BehaviorSubject([]);
    this.users = this._users.asObservable();

    this._settings = <BehaviorSubject<FarmSettings>>new BehaviorSubject(new FarmSettings());
    this.settings = this._settings.asObservable();

    this._user = <BehaviorSubject<FarmUser>>new BehaviorSubject(new FarmUser());
    this.user = this._user.asObservable();

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser && currentUser.farm) {
      this.loadFarm(currentUser.farm.id);
      this.loadUsers(currentUser.farm.id);
      this.loadSettings(currentUser.farm.id);
    }
  }

  public get farmValue(): Farm {
    return this._farm.value;
  }

  public get usersValue(): FarmUser[] {
    return this._users.value;
  }

  public get userValue(): FarmUser {
    return this._user.value;
  }

  public get settingsValue(): FarmSettings {
    return this._settings.value;
  }

  public set farmValue(farm: Farm) {
    this._farm = new BehaviorSubject<Farm>(farm);
    this.farm = this._farm.asObservable();
  }

  public set usersValue(users: Array<FarmUser>) {
    this._users = new BehaviorSubject<FarmUser[]>(users);
    this.users = this._users.asObservable();
  }

  public set userValue(user: FarmUser) {
    this._user = new BehaviorSubject<FarmUser>(user);
    this.user = this._user.asObservable();
  }

  public set settingsValue(settings: FarmSettings) {
    this._settings = new BehaviorSubject<FarmSettings>(settings);
    this.settings = this._settings.asObservable();
  }

  loadFarm(farmid: string) {
    console.log(`Farm Service: loadFarm(${farmid})`);
    this.farmApi.getFarm(farmid).subscribe(
      data => { 
        this.dataStore.farm = new Farm(data);
        this._farm.next(Object.assign({}, this.dataStore).farm);
      },
      error => this.alertService.handleError(error)
    );
  }

  loadUsers(farmid: string){
    console.log(`Farm Service: loadUsers(${farmid})`);
    this.farmApi.getUsers(farmid).subscribe(
      data => {
        this.dataStore.users = data.map(user => new FarmUser(user));
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      error => this.alertService.handleError(error)
    );
  }

  loadSettings(farmid: string){
    console.log(`Farm Service: loadSettings(${farmid})`);
    this.farmApi.getSettings(farmid).subscribe(
      data => { 
        this.dataStore.settings = new FarmSettings(data);
        this._settings.next(Object.assign({}, this.dataStore).settings);
      },
      error => this.alertService.handleError(error)
    );
  }

  loadFarmUser(farmid: string, farmuserid: string){
    console.log(`Farm Service: loadFarmUser(${farmid}, ${farmuserid})`);
    this.farmApi.getUser(farmid, farmuserid).subscribe(
      data => { 
        this.dataStore.user = new FarmUser(data);
        this._user.next(Object.assign({}, this.dataStore).user);
      },
      error => this.alertService.handleError(error)
    );
  }
  
  updateFarm(farm: Farm){
    return this.farmApi
      .update(farm)
      .subscribe(response => {
        console.log(`FarmService.updateFarm:${farm.id} -> ${response}`);
        this.dataStore.farm = new Farm(response);
        this._farm.next(Object.assign({}, this.dataStore).farm);
      },
      error => {
        this.alertService.handleError(error);
      }
    );
  }

  updateFarmSettings(farmid: string, farmsettings: FarmSettings){
    return this.farmApi
      .updateSettings(farmid, farmsettings)
      .subscribe(response => {
        console.log(`FarmService.updateFarmSettings:${farmid} -> ${response}`);
        this.dataStore.settings = new FarmSettings(response);
        this._settings.next(Object.assign({}, this.dataStore).settings);
      },
      error => {
        this.alertService.handleError(error);
      }
    );
  }

  updateFarmUser(farmid: string, farmuserid: string, farmuser: FarmUser){
    return this.farmApi
      .updateFarmUser(farmid, farmuserid, farmuser)
      .subscribe(response => {
        console.log(`FarmService.updateFarmUser:${farmid} ${farmuserid} -> ${response}`);
        this.dataStore.users.forEach((t, i) => {
          if (t.id === farmuserid) { this.dataStore.users[i] = new FarmUser(farmuser); }
        });
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      error => {
        this.alertService.handleError(error);
      }
    );
  }

  inviteUserToFarm(farmid: string, inviteduser:InvitedUser){
    return this.farmApi
      .inviteUser(farmid, inviteduser)
      .subscribe(response => {
        console.log(`FarmService.updateFarmUser:${farmid} -> ${response}`);
        this.dataStore.users.push(response);
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      error => {
        this.alertService.handleError(error);
      }
    );
  }

  removeFarmUser(farmid: string, farmuserid: string){
    return this.farmApi
      .removeFarmUser(farmid, farmuserid)
      .subscribe(response => {
        console.log(`FarmService.removeFarmUser:${farmid} ${farmuserid} -> ${response}`);
        this.dataStore.users.forEach((t, i) => {
          if (t.id === farmuserid) { this.dataStore.users.splice(i, 1); }
        });
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      error => {
        this.alertService.handleError(error);
      }
    );
  }
}
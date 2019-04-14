import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageType } from '../_models/inventory.models';
import { FeedCategory, GrowthRate } from '../_models/lookup.models';
import { FarmLocation } from '../_models/farm.models';
import { environment } from '../../environments/environment';
import { FeedType } from '../_models/feedplan.models';

@Injectable({
  providedIn: 'root'
})
export class LookupBackend {

  constructor(private http: HttpClient) { }

  getStorageTypes() {
    return this.http.get<StorageType[]>(`${environment.apiUrl}/storagetypes`);
  }

  
  getFeed(name: string) {
    return this.http.get<FeedType>(`${environment.apiUrl}/feeds/${name}`);
  }

  ///Note : FeedType[] changed to any
  getFeeds() {
    return this.http.get<any>(`${environment.apiUrl}/feeds`);
  }

  getFeedCategories(){
    return this.http.get<FeedCategory[]>(`${environment.apiUrl}/feeds/categories`);
  }

  getFeedsByCategory(category: string){
    return this.http.get<FeedType[]>(`${environment.apiUrl}/feeds/category/${category}`);
  }

  getFeedsByStorageType(storageTypeId: string){
    return this.http.get<FeedType[]>(`${environment.apiUrl}/feeds/storagetype/${storageTypeId}`);
  }

  getFeedsByStorageFacility(storageFacilityId: string){
    return this.http.get<FeedType[]>(`${environment.apiUrl}/feeds/storagefacility/${storageFacilityId}`);
  }

  getFeedGrowthRate(feedType: string, location: string, month: string) {
    return this.http.get<GrowthRate>(`${environment.apiUrl}/growthrates/${feedType}/${location}/${month}`);
  }

  getLocations(){
    return this.http.get<FarmLocation[]>(`${environment.apiUrl}/locations`);
  }
}
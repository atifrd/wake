import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageFacility, StorageDimensions, Delivery, StorageFeedRates, Stocktake } from '../_models/inventory.models';
import { RecordDelivery, RecordStocktake, AddStorageFacility } from '../_reqiests/inventory.requests';

@Injectable()

export class InventoryBackendService {

    constructor(private http:HttpClient){ }

    get(farmid: string) {
        return this.http.get<StorageFacility[]>(`${environment.apiUrl}/farms/${farmid}/storage`);
    }

    getStorageFacility(farmId: string, storageFacilityId: string){
        return this.http.get<StorageFacility>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}`);
    }
    
    getStorageFacilityDeliveries(farmId: string, storageFacilityId: string){
        return this.http.get<Delivery[]>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}/deliveries`);
    }
    
    getStorageFacilityStocktakes(farmId: string, storageFacilityId: string){
        return this.http.get<Stocktake[]>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}/stocktakes`);
    }
    
    updateStorageFacilityFeedrate(farmId: string, storageFacilityId: string, feedRates: StorageFeedRates){
        return this.http.put<StorageFeedRates>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}/feedrates`, feedRates);
    }
    
    getStorageFacilities(farmId: string){
        return this.http.get<StorageFacility[]>(`${environment.apiUrl}/farms/${farmId}/storage`);
    }
    
    addStorageFacility(farmId: string, storageFacility: AddStorageFacility){
        return this.http.post<AddStorageFacility>(`${environment.apiUrl}/farms/${farmId}/storage/`, storageFacility);
    }   
    
    updateStorageFacility(farmId: string, storageFacilityId: string, storageFacility: StorageFacility){
        return this.http.put<StorageFacility>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}`, storageFacility);
    }
    
    updateStorageFacilityName(farmId: string, storageFacilityId: string, storageFacility: StorageFacility){
        return this.http.put<StorageFacility>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}/name`, storageFacility);
    }
    
    removeStorageFacility(farmId: string, storageFacilityId: string){
        return this.http.delete<StorageFacility>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}`);
    }
    
    recordStorageFacilityDelivery(farmId: string, storageFacilityId: string, delivery: RecordDelivery){
        return this.http.post<RecordDelivery>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}/deliveries`, delivery);
    }
    
    recordStorageFacilityStocktake(farmId: string, storageFacilityId: string, stocktake: RecordStocktake){
        return this.http.post<any>(`${environment.apiUrl}/farms/${farmId}/storage/${storageFacilityId}/stocktakes`, stocktake);
    }
}
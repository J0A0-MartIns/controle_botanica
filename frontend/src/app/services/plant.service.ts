import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant.model';
import { CareRecord } from '../models/care.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = `${environment.apiUrl}/plants`;

  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.apiUrl);
  }

  getPlant(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.apiUrl}/${id}`);
  }

  addPlant(plant: Plant): Observable<Plant> {
    return this.http.post<Plant>(this.apiUrl, plant);
  }

  addCareRecord(plantId: number, record: CareRecord): Observable<CareRecord> {
    return this.http.post<CareRecord>(`${this.apiUrl}/${plantId}/records`, record);
  }

  getCareRecords(plantId: number): Observable<CareRecord[]> {
    return this.http.get<CareRecord[]>(`${this.apiUrl}/${plantId}/records`);
  }
}

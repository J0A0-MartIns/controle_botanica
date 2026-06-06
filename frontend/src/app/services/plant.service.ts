import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant.model';
import { CareRecord } from '../models/care.model';
@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private getApiUrl(): string {
    if (typeof window === 'undefined') {
      return '/api/plants';
    }
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return '/api/plants'; // Local proxy dev server
    }
    if (host.includes('infrabotanica.duckdns.org')) {
      return 'https://api.infrabotanica.duckdns.org/api/plants';
    }
    if (host.includes('app.132.145.196.104.nip.io')) {
      return 'https://api.132.145.196.104.nip.io/api/plants';
    }
    if (host.startsWith('app.')) {
      return `https://${host.replace('app.', 'api.')}/api/plants`;
    }
    return '/api/plants';
  }

  private apiUrl = this.getApiUrl();

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

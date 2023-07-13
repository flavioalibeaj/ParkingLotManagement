import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotService {

  constructor(private http: HttpClient) { }

  getAllSpots(): Observable<any> {
    return this.http.get("localhost:7091/api/ParkingSpot")
  }
}

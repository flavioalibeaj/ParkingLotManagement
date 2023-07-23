import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { ParkingSpot } from '../../models/parking-spot';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotService {

  constructor(private http: HttpClient) { }

  getAllSpots(): Observable<ParkingSpot> {
    return this.http.get<ParkingSpot>("https://localhost:7091/api/ParkingSpot")
      .pipe(
        // tap<ParkingSpot>(value => console.log("All Spots", value))
        catchError(err => {
          throw err
        })
      )
  }

  // updateSpot(id: number, editedSpot: ParkingSpot): Observable<ParkingSpot> {
  //   return this.http.put<ParkingSpot>(`https://localhost:7091/api/ParkingSpot/${id}`, editedSpot)
  //     .pipe(
  //       tap<ParkingSpot>(value => console.log("Updated Spot", value))
  //     )
  // }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Subscribers } from 'src/app/models/subscribers';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Subscribers[]> {
    return this.http.get<Subscribers[]>("https://localhost:7091/api/Subscriber")
      .pipe(
        // tap<Subscriber[]>(value => console.log("All subscribers", value))
        catchError(err => {
          throw err
        })
      )
  }

  create(subscriber: Subscribers): Observable<Subscribers> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Subscribers>("https://localhost:7091/api/Subscriber", subscriber, { headers })
      .pipe(
        // tap<Subscriber>(value => console.log("Created subscriber", value))
        catchError(err => {
          throw err
        })
      )
  }

  getOne(id: number): Observable<Subscribers> {
    return this.http.get<Subscribers>(`https://localhost:7091/api/Subscriber/${id}`)
      .pipe(
        // tap<Subscriber>(value => console.log("Single sub", value))
        catchError(err => {
          throw err
        })
      )
  }

  updateSubscriber(id: number, editedSubscriber: Subscribers): Observable<Subscribers> {
    return this.http.put<Subscribers>(`https://localhost:7091/api/Subscriber/${id}`, editedSubscriber)
      .pipe(
        // tap<Subscriber>(value => console.log("Updated sub", value))
        catchError(err => {
          throw err
        })
      )
  }

  deleteSubscriber(id: number): Observable<Subscribers> {
    return this.http.delete<Subscribers>(`https://localhost:7091/api/Subscriber/${id}`)
      .pipe(
        // tap<Subscriber>(value => console.log("Deleted sub", value))
        catchError(err => {
          throw err
        })
      )
  }

  getSubscribersWithoutActiveSubscription(): Observable<Subscribers[]> {
    return this.http.get<Subscribers[]>("https://localhost:7091/api/Subscriber/GetSubscribersWithNoActiveSubscriptions")
      .pipe(
        // tap<Subscriber[]>(value => console.log("Value", value))
        catchError(err => {
          throw err
        })
      )
  }
}

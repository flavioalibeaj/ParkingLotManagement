import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Subscriber } from 'src/app/models/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>("https://localhost:7091/api/Subscriber")
      .pipe(
        // tap<Subscriber[]>(value => console.log("All subscribers", value))
        catchError(err => {
          throw err
        })
      )
  }

  create(subscriber: Subscriber): Observable<Subscriber> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Subscriber>("https://localhost:7091/api/Subscriber", subscriber, { headers })
      .pipe(
        // tap<Subscriber>(value => console.log("Created subscriber", value))
        catchError(err => {
          throw err
        })
      )
  }

  getOne(id: number): Observable<Subscriber> {
    return this.http.get<Subscriber>(`https://localhost:7091/api/Subscriber/${id}`)
      .pipe(
        // tap<Subscriber>(value => console.log("Single sub", value))
        catchError(err => {
          throw err
        })
      )
  }

  updateSubscriber(id: number, editedSubscriber: Subscriber): Observable<Subscriber> {
    return this.http.put<Subscriber>(`https://localhost:7091/api/Subscriber/${id}`, editedSubscriber)
      .pipe(
        // tap<Subscriber>(value => console.log("Updated sub", value))
        catchError(err => {
          throw err
        })
      )
  }

  deleteSubscriber(id: number): Observable<Subscriber> {
    return this.http.delete<Subscriber>(`https://localhost:7091/api/Subscriber/${id}`)
      .pipe(
        // tap<Subscriber>(value => console.log("Deleted sub", value))
        catchError(err => {
          throw err
        })
      )
  }

  getSubscribersWithoutActiveSubscription(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>("https://localhost:7091/api/Subscriber/GetSubscribersWithNoActiveSubscriptions")
      .pipe(
        // tap<Subscriber[]>(value => console.log("Value", value))
        catchError(err => {
          throw err
        })
      )
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Subscriptions } from 'src/app/models/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Subscriptions[]> {
    return this.http.get<Subscriptions[]>("https://localhost:7091/api/Subscription")
      .pipe(
        // tap<Subscription[]>(value => console.log("All subscriptions", value))
        catchError(err => {
          throw err
        })
      )
  }

  create(subscription: Subscriptions): Observable<Subscriptions> {
    return this.http.post<Subscriptions>("https://localhost:7091/api/Subscription", subscription)
      .pipe(
        // tap<Subscription>(value => console.log("Created subscription", value))
        catchError(err => {
          throw err
        })
      )
  }

  getOne(id: number): Observable<Subscriptions> {
    return this.http.get<Subscriptions>(`https://localhost:7091/api/Subscription/${id}`)
      .pipe(
        // tap<Subscription>(value => console.log("Single subscription", value))
        catchError(err => {
          throw err
        })
      )
  }

  delete(id: number): Observable<Subscriptions> {
    return this.http.delete<Subscriptions>(`https://localhost:7091/api/Subscription/${id}`)
      .pipe(
        // tap<Subscription>(value => console.log("Deleted subscription", value))
        catchError(err => {
          throw err
        })
      )
  }

  getSubscriptionsWithoutActiveLogs(): Observable<Subscriptions[]> {
    return this.http.get<Subscriptions[]>("https://localhost:7091/api/Subscription/GetSubscriptionsWithNoActiveLogs")
      .pipe(
        // tap<Subscription[]>(value => console.log("Value", value))
        catchError(err => {
          throw err
        })
      )
  }
}

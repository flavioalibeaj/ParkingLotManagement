import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Subscription } from 'src/app/models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>("https://localhost:7091/api/Subscription")
      .pipe(
        tap<Subscription[]>(value => console.log("All subscriptions", value))
      )
  }

  create(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>("https://localhost:7091/api/Subscription", subscription)
      .pipe(
        tap<Subscription>(value => console.log("Created subscription", value))
      )
  }

  getOne(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(`https://localhost:7091/api/Subscription/${id}`)
      .pipe(
        tap<Subscription>(value => console.log("Single subscription", value))
      )
  }

  delete(id: number): Observable<Subscription> {
    return this.http.delete<Subscription>(`https://localhost:7091/api/Subscription/${id}`)
      .pipe(
        tap<Subscription>(value => console.log("Deleted subscription", value))
      )
  }
}

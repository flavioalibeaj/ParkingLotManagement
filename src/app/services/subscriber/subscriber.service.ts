import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Subscriber } from 'src/app/models/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>("https://localhost:7091/api/Subscriber")
      .pipe(
        tap<Subscriber[]>(value => console.log("All subscribers", value))
      )
  }

  create(subscriber: Subscriber): Observable<Subscriber> {
    return this.http.post<Subscriber>("https://localhost:7091/api/Subscriber", subscriber)
      .pipe(
        tap<Subscriber>(value => console.log("Created subscriber", value))
      )
  }

  getOne(id: number): Observable<Subscriber> {
    return this.http.get<Subscriber>(`https://localhost:7091/api/Subscriber/${id}`)
      .pipe(
        tap<Subscriber>(value => console.log("Single sub", value))
      )
  }

  updateSubscriber(id: number, editedSubscriber: Subscriber): Observable<Subscriber> {
    return this.http.put<Subscriber>(`https://localhost:7091/api/Subscriber/${id}`, editedSubscriber)
      .pipe(
        tap<Subscriber>(value => console.log("Updated sub", value))
      )
  }

  deleteSubscriber(id: number): Observable<Subscriber> {
    return this.http.delete<Subscriber>(`https://localhost:7091/api/Subscriber/${id}`)
      .pipe(
        tap<Subscriber>(value => console.log("Deleted sub", value))
      )
  }
}

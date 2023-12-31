import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { PricingPlan } from 'src/app/models/pricing-plan';

@Injectable({
  providedIn: 'root'
})
export class PricingPlanService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<PricingPlan[]> {
    return this.http.get<PricingPlan[]>("https://localhost:7091/api/PricingPlan")
      .pipe(
        // tap<PricingPlan[]>(value => console.log("All plans", value))
        catchError((err: any) => {
          throw err
        })
      )
  }

  getOne(type: string): Observable<PricingPlan> {
    return this.http.get<PricingPlan>(`https://localhost:7091/api/PricingPlan/${type}`)
      .pipe(
        // tap<PricingPlan>(value => console.log("Single plan", value))
        catchError((err) => {
          throw err
        })
      )
  }

  update(type: string, editedPlan: PricingPlan): Observable<PricingPlan> {
    return this.http.put<PricingPlan>(`https://localhost:7091/api/PricingPlan/${type}`, editedPlan)
      .pipe(
        // tap<PricingPlan>(value => console.log("Updated plan", value))
        catchError(err => {
          throw err
        })
      )
  }
}

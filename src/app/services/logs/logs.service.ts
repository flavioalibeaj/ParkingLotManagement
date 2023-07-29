import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Logs } from 'src/app/models/logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) { }

  getAllLogs(): Observable<Logs[]> {
    return this.http.get<Logs[]>("https://localhost:7091/api/Logs")
      .pipe(
        // tap<Logs[]>(value => console.log("All logs", value)),
        catchError(err => {
          throw err
        })
      )
  }

  createLog(log: Logs): Observable<Logs> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Logs>("https://localhost:7091/api/Logs", log, { headers })
      .pipe(
        // tap<Logs>(value => console.log("Created log", value)),
        catchError(err => {
          throw err
        })
      )
  }

  getOne(code: string): Observable<Logs> {
    // const params = new HttpParams().set("searchquery", code)

    return this.http.get<Logs>(`https://localhost:7091/api/Logs/code/${code}`)
      .pipe(
        // tap<Logs>(value => console.log("Single log", value)),
        catchError(err => {
          console.log("error")
          throw err
        })
      )
  }

  updateLog(code: string, editedLog: Logs): Observable<Logs> {
    return this.http.put<Logs>(`https://localhost:7091/api/Logs/${code}`, editedLog)
      .pipe(
        // tap<Logs>(value => console.log("Updated log", value)),
        catchError(err => {
          throw err
        })
      )
  }
}

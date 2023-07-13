import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Logs } from 'src/app/models/logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) { }

  getAllLogs(): Observable<Logs[]> {
    return this.http.get<Logs[]>("https://localhost:7091/api/Logs")
      .pipe(
        tap<Logs[]>(value => console.log("All logs", value))
      )
  }

  createLog(log: Logs): Observable<Logs> {
    return this.http.post<Logs>("https://localhost:7091/api/Logs", log)
      .pipe(
        tap<Logs>(value => console.log("Created log", value))
      )
  }

  getDayLogs(day: string): Observable<Logs> {
    return this.http.get<Logs>(`https://localhost:7091/api/Logs/${day}`)
      .pipe(
        tap<Logs>(value => console.log("Single log", value))
      )
  }

  updateLog(code: string, editedLog: Logs): Observable<Logs> {
    return this.http.put<Logs>(`https://localhost:7091/api/Logs/${code}`, editedLog)
      .pipe(
        tap<Logs>(value => console.log("Updated log", value))
      )
  }
}

import { Component, OnInit } from '@angular/core';
import { Logs } from 'src/app/models/logs';
import { LogsService } from 'src/app/services/logs/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  allLogs!: Logs[]

  constructor(private logService: LogsService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.logService.getAllLogs().subscribe({
      next: (logs: Logs[]) => {
        this.allLogs = logs
      },
      error: (err) => {
        console.log("Error", err)
      }
    })
  }

}

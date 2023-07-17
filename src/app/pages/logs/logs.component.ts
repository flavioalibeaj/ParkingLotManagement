import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Logs } from 'src/app/models/logs';
import { LogsService } from 'src/app/services/logs/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  allLogs!: Logs[]
  isAlertShown: boolean = false
  alertTimeout: any
  newLog!: FormGroup

  constructor(private logService: LogsService) { }

  ngOnInit(): void {
    this.newLog = new FormGroup({
      // checkInTime: new FormControl(null)
      code: new FormControl(null)
    });
    this.getAll()
  }

  getAll() {
    this.logService.getAllLogs().subscribe({
      next: (logs: Logs[]) => {
        console.log("All logs", logs)
        this.allLogs = logs
      },
      error: (err) => {
        console.log("Error", err)
      }
    })
  }

  createLog() {
    this.newLog.controls['code'].setValue("123");
    this.logService.createLog(this.newLog.value).subscribe({
      next: (res) => {
        console.log("Created Log Succesfully", res)
      },
      error: (err) => {
        console.log("Error Creating Log", err)
      }
    })
  }

  showAlert() {
    this.isAlertShown = true

    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isAlertShown = false;
    }, 2500)
  }

}

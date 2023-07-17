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
  isSuccessShown: boolean = false
  isDangerShown: boolean = false
  alertTimeout: any
  newLog!: FormGroup

  constructor(private logService: LogsService) { }

  ngOnInit(): void {
    this.newLog = new FormGroup({
      code: new FormControl('')
    });
    this.getAll()
  }

  getAll() {
    this.logService.getAllLogs()
      .subscribe({
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
    // this.newLog.controls['code'].setValue("123567922e2");
    this.logService.createLog(this.newLog.value).subscribe({
      next: (res) => {
        console.log("Created Log Succesfully", res)
        this.allLogs.push(res)
        this.successAlert()
      },
      error: (err) => {
        console.log("Error Creating Log", err)
        this.errorAlert()
      }
    })
  }

  successAlert() {
    this.isSuccessShown = true

    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isSuccessShown = false;
    }, 2500)
  }

  updateLog(code: string) {
    this.logService.updateLog(code, this.newLog.value).subscribe({
      next: (res) => {
        console.log("Edited Log Succesfully", res)
        this.getAll()
      },
      error: (err) => {
        console.log("Error Editing Log", err)
      }
    })
  }

  errorAlert() {
    this.isDangerShown = true;
    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isDangerShown = false
    })
  }

}

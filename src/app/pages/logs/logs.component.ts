import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Logs } from 'src/app/models/logs';
import { LogsService } from 'src/app/services/logs/logs.service';
import { SearchService } from 'src/app/services/search/search.service';

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

  searchTermRecieved!: string

  constructor(private logService: LogsService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.newLog = new FormGroup({
      subscriptionId: new FormControl(null)
    });
    this.getAll()
    this.searchService.dataEmitter.subscribe(res => {
      this.searchTermRecieved = res;
      this.filterLogs()
    })
  }

  getAll() {
    this.logService.getAllLogs()
      .subscribe({
        next: (logs: Logs[]) => {
          this.allLogs = logs.reverse()
        },
        error: (err) => {
          this.errorAlert()
          throw err
        }
      })
  }

  createLog() {
    this.logService.createLog(this.newLog.value).subscribe({
      next: (res) => {
        this.allLogs.unshift(res)
        this.successAlert()
      },
      error: (err) => {
        this.errorAlert()
        throw err
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

  checkOut(code: string) {
    this.logService.updateLog(code, this.newLog.value).subscribe({
      next: (res) => {
        this.getAll()
      },
      error: (err) => {
        this.errorAlert()
        throw err
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

  filterLogs() {
    // if (this.searchTermRecieved) {
    //   this.allLogs = this.originalLogs.filter((log) => {
    //     const codeMatch = log.code && log.code.toLowerCase().includes(this.searchTermRecieved.toLowerCase());
    //     if (log.subscription && log.subscription.subscriber) {
    //       const subFNameMatch = log.subscription.subscriber.firstName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());
    //       const subLNameMatch = log.subscription.subscriber.lastName.toLowerCase() === this.searchTermRecieved.toLowerCase();

    //       return codeMatch || subFNameMatch || subLNameMatch;
    //     } else {
    //       return codeMatch
    //     }
    //   });
    // } else {
    //   this.allLogs = this.originalLogs.slice();
    // }
  }
}

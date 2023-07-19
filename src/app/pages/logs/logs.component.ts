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
          throw err
        }
      })
  }

  createLog() {
    this.logService.createLog(this.newLog.value).subscribe({
      next: (res) => {
        console.log("Created Log Succesfully", res)
        this.allLogs.unshift(res)
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

  // filterLogs() {
  //   if (this.searchTermRecieved) {
  //     this.allLogs = this.allLogs.filter((log) =>
  //       log.code === this.searchTermRecieved ||
  //       (log.subscriptionId !== null && log.subscription.subscriber.firstName.toLowerCase().includes(this.searchTermRecieved.toLowerCase()))
  //     );
  //   } else {
  //     this.getAll();
  //   }
  // }

  filterLogs() {
    if (this.searchTermRecieved) {
      this.allLogs = this.allLogs.filter((log) => {
        console.log("log:", log);
        const logCodeMatch = log.code === this.searchTermRecieved;
        const subscriberFirstName = log.subscription.subscriber.firstName;
        console.log("subscriberFirstName:", subscriberFirstName);
        const subscriberFirstNameMatch = subscriberFirstName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());
        console.log("subscriberFirstNameMatch:", subscriberFirstNameMatch);

        return logCodeMatch || subscriberFirstNameMatch;
      });
    } else {
      this.getAll();
    }
  }



}

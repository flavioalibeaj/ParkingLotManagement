import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Logs } from 'src/app/models/logs';
import { Subscriptions } from 'src/app/models/subscriptions';
import { LogsService } from 'src/app/services/logs/logs.service';
import { SearchService } from 'src/app/services/search/search.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html'
})
export class LogsComponent implements OnInit {

  allLogs!: Logs[]
  originalLogs!: Logs[]
  isSuccessShown: boolean = false
  isDangerShown: boolean = false
  alertTimeout: any
  newLog!: FormGroup
  subscriptionOptions!: Subscriptions[]
  logCreationMode: boolean = false
  searchTermRecieved!: string
  errorMessage?: string
  successMessage?: string

  constructor(private logService: LogsService, private searchService: SearchService, private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.newLog = new FormGroup({
      subscriptionId: new FormControl(null)
    });
    this.getAll()
    this.searchService.dataEmitter.subscribe(res => {
      this.searchTermRecieved = res;
      this.filterLogs()
    })
    this.getSubscriptionsWithoutActiveLogs()
  }

  getAll() {
    this.logService.getAllLogs()
      .subscribe({
        next: (logs: Logs[]) => {
          this.allLogs = logs
          this.originalLogs = logs.reverse()
        },
        error: (err) => {
          this.errorMessage = err.error
          this.errorAlert(this.errorMessage)
        }
      })
  }

  getSubscriptionsWithoutActiveLogs() {
    this.subscriptionService.getSubscriptionsWithoutActiveLogs().subscribe({
      next: (subs: Subscriptions[]) => {
        this.subscriptionOptions = subs
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }

  createLog() {
    this.logService.createLog(this.newLog.value).subscribe({
      next: (res) => {
        this.allLogs.unshift(res)
        this.successMessage = "Created Log Succesfully"
        this.successAlert(this.successMessage)

        if (this.newLog.controls['subscriptionId'] !== null) {
          const index = this.subscriptionOptions.findIndex(opt => opt.id == this.newLog.controls['subscriptionId'].value)
          this.subscriptionOptions.splice(index, 1)
        }
        this.newLog.reset()
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }

  checkOut(code: string) {
    this.logService.updateLog(code, this.newLog.value).subscribe({
      next: (res) => {
        const index = this.allLogs.findIndex(log => log.code === code)
        this.allLogs[index] = res

        this.successMessage = `Checked ${code} Out`
        this.successAlert(this.successMessage)
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }


  successAlert(success?: string) {
    this.isSuccessShown = true

    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isSuccessShown = false;
    }, 3000)
  }

  errorAlert(err?: string) {
    this.isDangerShown = true;
    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isDangerShown = false
    }, 3000)
  }

  filterLogs() {
    if (this.searchTermRecieved) {
      this.allLogs = this.originalLogs.filter((log) => {
        const codeMatch = log.code.toLowerCase() === this.searchTermRecieved.toLowerCase();

        if (log.subscription && log.subscriptionId) {
          const subFNameMatch = log.subscription.subscriber.firstName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());
          const subLNameMatch = log.subscription.subscriber.lastName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());

          return codeMatch || subFNameMatch || subLNameMatch
        }

        return codeMatch

      });
    } else {
      this.allLogs = this.originalLogs.slice()
    }
  }
}

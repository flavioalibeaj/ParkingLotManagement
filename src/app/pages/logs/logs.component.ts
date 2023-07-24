import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Logs } from 'src/app/models/logs';
import { Subscriptions } from 'src/app/models/subscriptions';
import { LogsService } from 'src/app/services/logs/logs.service';
import { SearchService } from 'src/app/services/search/search.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit, OnDestroy {

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
  singleLog?: Logs
  // searchSubscription: Subscription

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

  ngOnDestroy(): void {

  }

  getAll() {
    this.logService.getAllLogs()
      .subscribe({
        next: (logs: Logs[]) => {
          this.allLogs = logs
          this.originalLogs = logs.reverse()
        },
        error: (err) => {
          console.log("Error Retrieving All Logs", err)
          this.errorMessage = err
          this.errorAlert(this.errorMessage)
          // throw err
        }
      })
  }

  getSubscriptionsWithoutActiveLogs() {
    this.subscriptionService.getSubscriptionsWithoutActiveLogs().subscribe({
      next: (subs: Subscriptions[]) => {
        this.subscriptionOptions = subs
      },
      error: (err) => {
        console.log("Error Getting Subscriptions Without Active Logs", err)
        this.errorMessage = err
        this.errorAlert(this.errorMessage)
        // throw err
      }
    })
  }

  createLog() {
    this.logService.createLog(this.newLog.value).subscribe({
      next: (res) => {
        this.allLogs.unshift(res)
        this.successMessage = "Created Log Succesfully"
        this.successAlert(this.successMessage)
        this.newLog.reset()
      },
      error: (err) => {
        console.log("Error Creating Log", err)
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
        console.log("Mesazhi errorit", err.error)

        // throw err
      }
    })
  }

  checkOut(code: string) {
    this.logService.updateLog(code, this.newLog.value).subscribe({
      next: (res) => {
        this.successMessage = `Checked ${code} Out`
        this.successAlert(this.successMessage)
        this.getAll()
        this.preFillModal(code)
      },
      error: (err) => {
        console.log("Error Checking Out", err)
        this.errorMessage = err
        this.errorAlert(this.errorMessage)
        // throw err
      }
    })
  }


  successAlert(success?: string) {
    this.isSuccessShown = true

    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isSuccessShown = false;
    }, 2500)
  }

  errorAlert(err?: string) {
    this.isDangerShown = true;
    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isDangerShown = false
    })
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

  preFillModal(code: string) {
    this.logService.getOne(code).subscribe({
      next: (log: Logs) => {
        this.singleLog = log
      },
      error: (err) => {
        console.log("Error filling modal", err)
      }
    })
  }
}

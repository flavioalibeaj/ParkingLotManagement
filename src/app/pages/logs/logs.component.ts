import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Logs } from 'src/app/models/logs';
import { Subscription } from 'src/app/models/subscription';
import { LogsService } from 'src/app/services/logs/logs.service';
import { SearchService } from 'src/app/services/search/search.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  allLogs!: Logs[]
  originalLogs!: Logs[]
  isSuccessShown: boolean = false
  isDangerShown: boolean = false
  alertTimeout: any
  newLog!: FormGroup
  subscriptionOptions!: Subscription[]
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
          this.errorMessage = err
          this.errorAlert(this.errorMessage)
          // throw err
        }
      })
  }

  getSubscriptionsWithoutActiveLogs() {
    this.subscriptionService.getSubscriptionsWithoutActiveLogs().subscribe({
      next: (subs: Subscription[]) => {
        this.subscriptionOptions = subs
      },
      error: (err) => {
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

  checkOut(code: string) {
    this.logService.updateLog(code, this.newLog.value).subscribe({
      next: (res) => {
        this.successMessage = `Checked ${code} Out`
        this.successAlert(this.successMessage)
        this.getAll()
      },
      error: (err) => {
        this.errorMessage = err
        this.errorAlert(this.errorMessage)
        // throw err
      }
    })
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
        const subFNameMatch = log.subscription.subscriber.firstName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());
        const subLNameMatch = log.subscription.subscriber.lastName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());

        return codeMatch || subFNameMatch || subLNameMatch;
      });
    } else {
      this.allLogs = this.originalLogs.slice()
    }
  }
}

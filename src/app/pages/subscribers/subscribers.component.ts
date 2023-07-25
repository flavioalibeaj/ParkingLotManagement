import { Component, HostListener, OnInit } from '@angular/core';
import { Subscribers } from 'src/app/models/subscribers';
import { SearchService } from 'src/app/services/search/search.service';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html'
})
export class SubscribersComponent implements OnInit {

  allSubscribers!: Subscribers[]
  originalSubscribers!: Subscribers[]
  searchTermRecieved!: string
  isSuccessShown: boolean = false
  isDangerShown: boolean = false
  errorMessage?: string
  successMessage?: string
  alertTimeout: any
  windowWidth = window.innerWidth

  constructor(private subscribersService: SubscriberService, private searchService: SearchService) { }

  @HostListener("window:resize", ['$event'])
  onWindowResize(event: any) {
    this.windowWidth = event.target.innerWidth
  }

  ngOnInit(): void {
    this.getAll()
    this.searchService.dataEmitter.subscribe(searchTerm => {
      this.searchTermRecieved = searchTerm
      this.filterLogs()
    })
  }

  getAll() {
    this.subscribersService.getAll().subscribe({
      next: (subscribers: Subscribers[]) => {
        this.allSubscribers = subscribers
        this.originalSubscribers = subscribers
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }

  delete(id: number) {
    this.subscribersService.deleteSubscriber(id).subscribe({
      next: (value) => {
        this.successMessage = "Deleted Subscriber"
        this.successAlert(this.successMessage)
        const index = this.allSubscribers.findIndex(subs => subs.id === id);
        this.allSubscribers.splice(index, 1)
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }

  filterLogs() {
    if (this.searchTermRecieved) {
      this.allSubscribers = this.originalSubscribers.filter((sub) => {
        const firstNameMatch = sub.firstName && sub.firstName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());
        const lastNameMatch = sub.lastName && sub.lastName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());
        const idCardNumberMatch = sub.idCardNumber && sub.idCardNumber.toLowerCase() === this.searchTermRecieved.toLowerCase();
        const emailMatch = sub.email && sub.email.toLowerCase().includes(this.searchTermRecieved.toLowerCase());

        return firstNameMatch || lastNameMatch || idCardNumberMatch || emailMatch;
      });
    } else {
      this.allSubscribers = this.originalSubscribers.slice();
    }
  }

  errorAlert(err?: string) {
    this.isDangerShown = true;
    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isDangerShown = false
    }, 3000)
  }

  successAlert(success?: string) {
    this.isSuccessShown = true

    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isSuccessShown = false;
    }, 3000)
  }

}

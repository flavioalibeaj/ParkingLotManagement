import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscriber } from 'src/app/models/subscriber';
import { SearchService } from 'src/app/services/search/search.service';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  allSubscribers!: Subscriber[]
  originalSubscribers!: Subscriber[]
  searchTermRecieved!: string

  constructor(private subscribersService: SubscriberService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.getAll()
    this.searchService.dataEmitter.subscribe(searchTerm => {
      this.searchTermRecieved = searchTerm
      this.filterLogs()
    })
  }

  getAll() {
    this.subscribersService.getAll().subscribe({
      next: (subscribers: Subscriber[]) => {
        this.allSubscribers = subscribers
        this.originalSubscribers = subscribers
      },
      error: (err) => {
        throw err
      }
    })
  }

  delete(id: number) {
    this.subscribersService.deleteSubscriber(id).subscribe({
      next: (value) => {
        const index = this.allSubscribers.findIndex(subs => subs.id === id);
        this.allSubscribers.splice(index, 1)
      },
      error: (err) => {
        throw err
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

}

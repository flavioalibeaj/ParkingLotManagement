import { Component, OnInit } from '@angular/core';
import { Subscriptions } from 'src/app/models/subscriptions';
import { SearchService } from 'src/app/services/search/search.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  allSubscriptions!: Subscriptions[]
  originalSubscriptions!: Subscriptions[]
  searchTermRecieved!: string

  constructor(private subscriptionService: SubscriptionService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.getAll()
    this.searchService.dataEmitter.subscribe(searchTerm => {
      this.searchTermRecieved = searchTerm
      this.filterLogs()
    })
  }

  getAll() {
    this.subscriptionService.getAll().subscribe({
      next: (subscriptions: Subscriptions[]) => {
        this.allSubscriptions = subscriptions
        this.originalSubscriptions = subscriptions
      },
      error: (err) => {
        throw err
      }
    })
  }

  filterLogs() {
    if (this.searchTermRecieved) {
      this.allSubscriptions = this.originalSubscriptions.filter((sub) => {
        const codeMatch = sub.code.toLowerCase() === this.searchTermRecieved.toLowerCase();
        const subFNameMatch = sub.subscriber.firstName.toLowerCase().includes(this.searchTermRecieved.toLowerCase())
        const subLNameMatch = sub.subscriber.lastName.toLowerCase().includes(this.searchTermRecieved.toLowerCase())

        return codeMatch || subFNameMatch || subLNameMatch
      });
    } else {
      this.allSubscriptions = this.originalSubscriptions.slice()
    }
  }


  delete(id: number) {
    this.subscriptionService.delete(id).subscribe({
      next: (deletedSub: Subscriptions) => {
        const index = this.allSubscriptions.findIndex(sub => sub.id === id)
        this.allSubscriptions.splice(index, 1)
      },
      error: (err) => {
        throw err
      }
    })
  }

}

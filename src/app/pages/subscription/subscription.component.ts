import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'src/app/models/subscriber';
import { Subscription } from 'src/app/models/subscription';
import { SearchService } from 'src/app/services/search/search.service';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  allSubscriptions!: Subscription[]
  // allSubscribers!: Subscriber[]
  originalSubscriptions!: Subscription[]
  searchTermRecieved!: string

  constructor(private subscriptionService: SubscriptionService, private searchService: SearchService, private subscriberService: SubscriberService) { }

  ngOnInit(): void {
    this.getAll()
    // this.getAllSubscribers()
    this.searchService.dataEmitter.subscribe(searchTerm => {
      this.searchTermRecieved = searchTerm
      this.filterLogs()
    })
  }

  getAll() {
    this.subscriptionService.getAll().subscribe({
      next: (subscriptions: Subscription[]) => {
        this.allSubscriptions = subscriptions
        this.originalSubscriptions = subscriptions
      },
      error: (err) => {
        throw err
      }
    })
  }

  // getAllSubscribers() {
  //   this.subscriberService.getAll().subscribe({
  //     next: (subscribers: Subscriber[]) => {
  //       this.allSubscribers = subscribers
  //     }
  //   })
  // }

  filterLogs() {
    if (this.searchTermRecieved) {
      this.allSubscriptions = this.originalSubscriptions.filter((sub) => {
        const codeMatch = sub.code && sub.code.toLowerCase() === this.searchTermRecieved.toLowerCase();
        // const subFNameMatch = this.allSubscribers.find(subscriber => subscriber.firstName.toLowerCase().includes(this.searchTermRecieved.toLowerCase()))
        // const subLNameMatch = this.allSubscribers.find(subscriber => subscriber.lastName.toLowerCase().includes(this.searchTermRecieved.toLowerCase()))

        const subFNameMatch = sub.subscriber.firstName.toLowerCase().includes(this.searchTermRecieved.toLowerCase())
        const subLNameMatch = sub.subscriber.lastName.toLowerCase().includes(this.searchTermRecieved.toLowerCase())


        console.log("Code Match", codeMatch)
        console.log("First Name Match", subFNameMatch)
        console.log("Last Name Match", subLNameMatch)

        return codeMatch || subFNameMatch || subLNameMatch
      });
    } else {
      this.allSubscriptions = this.originalSubscriptions.slice()
    }
  }


  delete(id: number) {
    this.subscriptionService.delete(id).subscribe({
      next: (deletedSub: Subscription) => {
        const index = this.allSubscriptions.findIndex(sub => sub.id === id)
        this.allSubscriptions.splice(index, 1)
      },
      error: (err) => {
        throw err
      }
    })
  }

}

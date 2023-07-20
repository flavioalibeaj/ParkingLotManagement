import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { SearchService } from 'src/app/services/search/search.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  allSubscriptions!: Subscription[]
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
      next: (subscriptions: Subscription[]) => {
        this.allSubscriptions = subscriptions
      },
      error: (err) => {
        console.log("Error", err)
      }
    })
  }

  filterLogs() {
    // if (this.searchTermRecieved) {
    //   this.allSubscriptions = this.allSubscriptions.filter((sub) => {
    //     const codeMatch = sub.code.toLowerCase() == this.searchTermRecieved.toLowerCase();
    //     const subFNameMatch = sub.subscriber && sub.subscriber.firstName && sub.subscriber.firstName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());
    //     const subLNameMatch = sub.subscriber && sub.subscriber.lastName && sub.subscriber.lastName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());

    //     return codeMatch || subFNameMatch || subLNameMatch;
    //   });
    // } else {
    //   this.getAll();
    // }
  }


  delete(id: number) {
    this.subscriptionService.delete(id).subscribe({
      next: (deletedSub: Subscription) => {
        const index = this.allSubscriptions.findIndex(sub => sub.id === deletedSub.id)
        this.allSubscriptions.splice(index, 1)
      },
      error: (err) => {
        throw err
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  allSubscriptions!: Subscription[]

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.getAll()
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

}

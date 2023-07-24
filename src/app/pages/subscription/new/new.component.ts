import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscribers } from 'src/app/models/subscribers';
import { Subscriptions } from 'src/app/models/subscriptions';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  addSub!: FormGroup
  optionSubscribers!: Subscribers[]
  allSubscriptions!: Subscriptions[]

  constructor(private subscriptionService: SubscriptionService, private subscriberService: SubscriberService, private router: Router) { }

  ngOnInit() {
    this.addSub = new FormGroup({
      discountValue: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      subscriberId: new FormControl(null, Validators.required)
    })
    this.getAllSubscriptions()
    this.getSubscribersWithoutSubscription()
  }

  private getAllSubscriptions() {
    this.subscriptionService.getAll().subscribe({
      next: (subs: Subscriptions[]) => {
        this.allSubscriptions = subs
      },
      error: (err) => {
        throw err
      }
    })
  }

  createSubscription() {
    this.subscriptionService.create(this.addSub.value).subscribe({
      next: (createdSub: Subscriptions) => {
        this.allSubscriptions.push(createdSub)
        this.router.navigate(["../"])
      },
      error: (err) => {
        throw err
      }
    })
  }

  getSubscribersWithoutSubscription() {
    this.subscriberService.getSubscribersWithoutActiveSubscription().subscribe({
      next: (subs: Subscribers[]) => {
        this.optionSubscribers = subs
      },
      error: (err) => {
        throw err
      }
    })
  }
}

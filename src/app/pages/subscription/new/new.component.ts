import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscribers } from 'src/app/models/subscribers';
import { Subscriptions } from 'src/app/models/subscriptions';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  addSub!: FormGroup
  optionSubscribers!: Subscribers[]
  allSubscriptions!: Subscriptions[]
  isDangerShown: boolean = false
  errorMessage?: string
  alertTimeout: any

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
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }

  createSubscription() {
    this.subscriptionService.create(this.addSub.value).subscribe({
      next: (createdSub: Subscriptions) => {
        this.allSubscriptions.push(createdSub)
        this.router.navigate(["subscriptions"])
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }

  getSubscribersWithoutSubscription() {
    this.subscriberService.getSubscribersWithoutActiveSubscription().subscribe({
      next: (subs: Subscribers[]) => {
        this.optionSubscribers = subs
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }

  errorAlert(err?: string) {
    this.isDangerShown = true;
    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isDangerShown = false
    }, 3000)
  }
}

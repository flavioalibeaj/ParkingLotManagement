import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriptions } from 'src/app/models/subscriptions';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-single-sub',
  templateUrl: './single-sub.component.html'
})
export class SingleSubComponent implements OnInit {

  subId!: number
  subscription!: Subscriptions

  isDangerShown: boolean = false
  errorMessage?: string
  alertTimeout: any

  constructor(private subscriptionService: SubscriptionService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.subId = params['id']
      this.getOne()
    })
  }

  getOne() {
    this.subscriptionService.getOne(this.subId).subscribe({
      next: (sub: Subscriptions) => {
        this.subscription = sub
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }

  navigate(id: number) {
    this.router.navigate([`subscribers/${id}`])
  }

  errorAlert(err?: string) {
    this.isDangerShown = true;
    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isDangerShown = false
    }, 3000)
  }

}

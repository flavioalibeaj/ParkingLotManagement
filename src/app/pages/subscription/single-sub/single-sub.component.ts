import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-single-sub',
  templateUrl: './single-sub.component.html',
  styleUrls: ['./single-sub.component.css']
})
export class SingleSubComponent implements OnInit {

  subId!: number
  subscription!: Subscription

  constructor(private subscriptionService: SubscriptionService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.subId = params['id']
      this.getOne()
    })
  }

  getOne() {
    this.subscriptionService.getOne(this.subId).subscribe({
      next: (sub: Subscription) => {
        this.subscription = sub
      },
      error: (err) => {
        throw err
      }
    })
  }

  navigateTo(id: number) {
    this.router.navigate([`subscribers/${id}`])
  }

}

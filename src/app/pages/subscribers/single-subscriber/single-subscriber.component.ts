import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'src/app/models/subscriber';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';

@Component({
  selector: 'app-single-subscriber',
  templateUrl: './single-subscriber.component.html',
  styleUrls: ['./single-subscriber.component.css']
})
export class SingleSubscriberComponent implements OnInit {

  subscriberIdCardNumber!: number
  subscriber!: Subscriber

  constructor(private activeRoute: ActivatedRoute, private SubService: SubscriberService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.subscriberIdCardNumber = params['idCardNumber']
      this.getOne()
    })
  }

  getOne() {
    this.SubService.getOne(this.subscriberIdCardNumber).subscribe({
      next: (sub: Subscriber) => {
        this.subscriber = sub
        console.log(this.subscriber)
      },
      error: (err) => {
        throw err
      }
    })
  }

}

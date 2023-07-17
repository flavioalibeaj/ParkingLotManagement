import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'src/app/models/subscriber';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  allSubscribers!: Subscriber[]

  constructor(private subscribersService: SubscriberService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.subscribersService.getAll().subscribe({
      next: (subscribers: Subscriber[]) => {
        this.allSubscribers = subscribers
      },
      error: (err) => {
        console.log("Error", err)
      }
    })
  }

}

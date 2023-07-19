import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Subscriber } from 'src/app/models/subscriber';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';

@Component({
  selector: 'app-single-subscriber',
  templateUrl: './single-subscriber.component.html',
  styleUrls: ['./single-subscriber.component.css']
})
export class SingleSubscriberComponent implements OnInit {

  subscriberId!: number
  subscriber!: Subscriber
  updateSub!: FormGroup

  constructor(private activeRoute: ActivatedRoute, private SubService: SubscriberService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.subscriberId = params['id']
      this.getOne()
    })

    this.updateSub = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      idCardNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, Validators.required),
      plateNumber: new FormControl(null, Validators.required)
    })

  }

  getOne() {
    this.SubService.getOne(this.subscriberId).subscribe({
      next: (sub: Subscriber) => {
        this.subscriber = sub
        this.preFillForm()
      },
      error: (err) => {
        throw err
      }
    })
  }

  preFillForm() {
    this.updateSub.patchValue({
      firstName: this.subscriber.firstName,
      lastName: this.subscriber.lastName,
      idCardNumber: this.subscriber.idCardNumber,
      email: this.subscriber.email,
      phoneNumber: this.subscriber.phoneNumber,
      plateNumber: this.subscriber.plateNumber,
    });
  }

  update() {
    this.SubService.updateSubscriber(this.subscriberId, this.updateSub.value).subscribe({
      next: (value: Subscriber) => {
        this.subscriber = value
      },
      error: (err) => {
        throw (err);
      }
    })
  }

}

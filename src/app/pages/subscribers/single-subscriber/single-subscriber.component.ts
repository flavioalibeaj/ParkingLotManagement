import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscribers } from 'src/app/models/subscribers';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';

@Component({
  selector: 'app-single-subscriber',
  templateUrl: './single-subscriber.component.html',
  styleUrls: ['./single-subscriber.component.css']
})
export class SingleSubscriberComponent implements OnInit {

  subscriberId!: number
  subscriber!: Subscribers
  updateSub!: FormGroup
  isSuccessShown: boolean = false
  isDangerShown: boolean = false
  errorMessage?: string
  successMessage?: string
  alertTimeout: any
  editMode: boolean = false

  constructor(private activeRoute: ActivatedRoute, private SubService: SubscriberService, private router: Router) { }

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
      next: (sub: Subscribers) => {
        this.subscriber = sub
        this.preFillForm()
      },
      error: (err) => {
        console.log("Error Retrieving Subscriber", err)
        this.errorMessage = "Error Retrieving Subscriber"
        this.errorAlert(this.errorMessage)
        // throw err
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
      next: (value: Subscribers) => {
        this.subscriber = value
        this.successMessage = "Updated Succesfully"
        this.successAlert(this.successMessage)
      },
      error: (err) => {
        console.log("Error Updating Subscriber", err)
        this.errorMessage = "Error Updating Subscriber"
        this.errorAlert(this.errorMessage)
        // throw (err);
      }
    })
  }

  errorAlert(err?: string) {
    this.isDangerShown = true;
    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isDangerShown = false
    })
  }

  successAlert(success?: string) {
    this.isSuccessShown = true

    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isSuccessShown = false;
    }, 2500)
  }

  navigate(id: number) {
    this.router.navigate([`subscriptions/${id}`])
  }

}

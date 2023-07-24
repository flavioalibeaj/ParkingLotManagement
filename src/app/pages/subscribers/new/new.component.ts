import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscribers } from 'src/app/models/subscribers';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  createSubForm!: FormGroup
  private allSubscribers!: Subscribers[]

  constructor(private subscribersService: SubscriberService, private router: Router) { }

  ngOnInit(): void {
    this.createSubForm = new FormGroup({
      FirstName: new FormControl(null, Validators.required),
      LastName: new FormControl(null, Validators.required),
      PhoneNumber: new FormControl(null, Validators.required),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      IdCardNumber: new FormControl(null, Validators.required),
      PlateNumber: new FormControl(null, Validators.required),
      Birthday: new FormControl(null, Validators.required),
      subscriptionForCreationDTO: new FormGroup({
        StartDate: new FormControl(null, Validators.required),
        EndDate: new FormControl(null, Validators.required),
        DiscountValue: new FormControl(null, Validators.required),
      })
    })
    this.getAll()
  }

  private getAll() {
    this.subscribersService.getAll().subscribe({
      next: (subscribers: Subscribers[]) => {
        this.allSubscribers = subscribers
      },
      error: (err) => {
        throw err
      }
    })
  }

  submitNewSub() {
    this.subscribersService.create(this.createSubForm.value).subscribe({
      next: (response: Subscribers) => {
        this.allSubscribers.push(response)
        this.router.navigate(["subscribers"])
      },
      error: (err) => {
        throw err
      }
    })
  }
}

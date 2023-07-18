import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscriber } from 'src/app/models/subscriber';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  allSubscribers!: Subscriber[]
  createSubForm!: FormGroup

  constructor(private subscribersService: SubscriberService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll()
    this.createSubForm = new FormGroup({
      FirstName: new FormControl(null, Validators.required),
      LastName: new FormControl(null, Validators.required),
      PhoneNumber: new FormControl(null, Validators.required),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      IdCardNumber: new FormControl(null, Validators.required),
      PlateNumber: new FormControl(null, Validators.required),
      Birthday: new FormControl(null, Validators.required),
      // subscriptionForCreationDTO: new FormGroup({
      StartDate: new FormControl(null, Validators.required),
      EndDate: new FormControl(null, Validators.required),
      // })
    })
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

  submitNewSub() {
    console.log("Success")
    this.subscribersService.create(this.createSubForm.value).subscribe({
      next: (response: Subscriber) => {
        console.log("Created new sub")
        this.allSubscribers.push(response)
      },
      error: (err) => {
        console.log("Error", err)
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { findIndex } from 'rxjs';
import { Subscriber } from 'src/app/models/subscriber';
import { SearchService } from 'src/app/services/search/search.service';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  allSubscribers!: Subscriber[]
  createSubForm!: FormGroup
  searchTermRecieved!: string

  constructor(private subscribersService: SubscriberService, private searchService: SearchService) { }

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
      subscriptionForCreationDTO: new FormGroup({
        StartDate: new FormControl(null, Validators.required),
        EndDate: new FormControl(null, Validators.required),
        DiscountValue: new FormControl(null, Validators.required),
      })
    })
    this.searchService.dataEmitter.subscribe(searchTerm => {
      this.searchTermRecieved = searchTerm
      this.filterLogs()
    })
  }

  getAll() {
    this.subscribersService.getAll().subscribe({
      next: (subscribers: Subscriber[]) => {
        this.allSubscribers = subscribers
      },
      error: (err) => {
        throw err
      }
    })
  }

  submitNewSub() {
    this.subscribersService.create(this.createSubForm.value).subscribe({
      next: (response: Subscriber) => {
        this.allSubscribers.push(response)
      },
      error: (err) => {
        throw err
      }
    })
  }

  delete(id: number) {
    this.subscribersService.deleteSubscriber(id).subscribe({
      next: (value) => {
        const index = this.allSubscribers.findIndex(subs => subs.id === id);
        this.allSubscribers.splice(index, 1)
      },
      error: (err) => {
        throw err
      }
    })
  }

  filterLogs() {
    if (this.searchTermRecieved) {
      this.allSubscribers = this.allSubscribers.filter((sub) => {

        const firstNameMatch = sub.firstName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());
        const lastNameMatch = sub.lastName.toLowerCase().includes(this.searchTermRecieved.toLowerCase());
        const idCardNumberMatch = sub.idCardNumber.toLowerCase() == this.searchTermRecieved.toLowerCase();
        const emailMatch = sub.email.toLowerCase().includes(this.searchTermRecieved.toLowerCase());

        return firstNameMatch || lastNameMatch || idCardNumberMatch || emailMatch;
      });
    } else {
      this.getAll();
    }
  }

}

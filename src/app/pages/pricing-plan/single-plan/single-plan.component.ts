import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PricingPlan } from 'src/app/models/pricing-plan';
import { PricingPlanService } from 'src/app/services/pricingPlan/pricing-plan.service';
import { Subscription } from "rxjs"
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-plan',
  templateUrl: './single-plan.component.html',
  styleUrls: ['./single-plan.component.css']
})
export class SinglePlanComponent implements OnInit, OnDestroy {

  type!: string
  pricingPlan!: PricingPlan
  pricingPlanSubscription!: Subscription
  updateForm!: FormGroup
  editMode: boolean = false


  constructor(private activeRoute: ActivatedRoute, private pricingPlanService: PricingPlanService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.type = params['type']
      this.getOne()
    })
    this.updateForm = new FormGroup({
      hourlyPricing: new FormControl(null, Validators.required),
      dailyPricing: new FormControl(null, Validators.required),
      minimumHours: new FormControl(null, Validators.required)
    })
  }

  getOne() {
    this.pricingPlanSubscription = this.pricingPlanService.getOne(this.type).subscribe({
      next: (pricingPlan: PricingPlan) => {
        this.pricingPlan = pricingPlan
      },
      error: (err) => {
        console.log("Error Retrieving Pricing Plan", err)
      }
    })
  }

  update() {
    this.pricingPlanService.update(this.type, this.updateForm.value).subscribe({
      next: (updatedPlan: PricingPlan) => {
        this.pricingPlan = updatedPlan
      },
      error: (err) => {
        throw err;
      }
    });
    console.log(this.updateForm.value)
  }

  ngOnDestroy() {
    this.pricingPlanSubscription.unsubscribe()
  }

  fillModal() {
    this.updateForm.patchValue({
      hourlyPricing: this.pricingPlan.hourlyPricing,
      dailyPricing: this.pricingPlan.dailyPricing,
      minimumHours: this.pricingPlan.minimumHours
    })
  }

}

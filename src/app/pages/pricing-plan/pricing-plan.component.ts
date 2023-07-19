import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PricingPlan } from 'src/app/models/pricing-plan';
import { PricingPlanService } from 'src/app/services/pricingPlan/pricing-plan.service';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.css']
})
export class PricingPlanComponent implements OnInit {

  pricingPlans!: PricingPlan[]
  updateForm!: FormGroup

  constructor(private pricingPlanService: PricingPlanService) { }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      hourlyPricing: new FormControl(null, Validators.required),
      dailyPricing: new FormControl(null, Validators.required),
      minimumHours: new FormControl(null, Validators.required)
    })
    this.getAll()
  }

  getAll() {
    this.pricingPlanService.getAll().subscribe({
      next: (plans: PricingPlan[]) => {
        this.pricingPlans = plans
        console.log(this.pricingPlans)
      },
      error: (err) => {
        console.log("Error", err)
      }
    })
  }

  update(type: string) {
    this.pricingPlanService.update(type, this.updateForm.value).subscribe({
      next: (updatedPlan: PricingPlan) => {
        this.getAll()
      },
      error: (err) => {
        throw err;
      }
    });
  }

}

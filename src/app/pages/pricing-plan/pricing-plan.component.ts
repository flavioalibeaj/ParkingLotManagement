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
      },
      error: (err) => {
        throw err
      }
    })
  }

  update(type: "weekend" | "weekday") {
    this.pricingPlanService.update(type, this.updateForm.value).subscribe({
      next: (updatedPlan: PricingPlan) => {
        const index = this.pricingPlans.findIndex(plan => plan.type === type)
        this.pricingPlans[index] = updatedPlan
      },
      error: (err) => {
        throw err;
      }
    });
  }

  fillModal(plan: PricingPlan) {
    const currectPlan = this.pricingPlans.find(pricingPlan => pricingPlan.type === plan.type)

    this.updateForm.patchValue({
      hourlyPricing: currectPlan?.hourlyPricing,
      dailyPricing: currectPlan?.dailyPricing,
      minimumHours: currectPlan?.minimumHours
    })
  }

}

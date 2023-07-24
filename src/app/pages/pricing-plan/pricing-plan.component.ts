import { Component, OnInit } from '@angular/core';
import { PricingPlan } from 'src/app/models/pricing-plan';
import { PricingPlanService } from 'src/app/services/pricingPlan/pricing-plan.service';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html'
})
export class PricingPlanComponent implements OnInit {

  pricingPlans!: PricingPlan[]
  isDangerShown: boolean = false
  alertTimeout: any
  errorMessage?: string

  constructor(private pricingPlanService: PricingPlanService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.pricingPlanService.getAll().subscribe({
      next: (plans: PricingPlan[]) => {
        this.pricingPlans = plans
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }


  errorAlert(err?: string) {
    this.isDangerShown = true;
    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isDangerShown = false
    }, 3000)
  }


}

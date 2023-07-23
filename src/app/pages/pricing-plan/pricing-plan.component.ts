import { Component, OnInit } from '@angular/core';
import { PricingPlan } from 'src/app/models/pricing-plan';
import { PricingPlanService } from 'src/app/services/pricingPlan/pricing-plan.service';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.css']
})
export class PricingPlanComponent implements OnInit {

  pricingPlans!: PricingPlan[]

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
        throw err
      }
    })
  }

}

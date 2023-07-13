import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlanComponent } from './pricing-plan.component';

import { PricingPlanRoutingModule } from './pricing-plan-routing.module';


@NgModule({
  declarations: [
    PricingPlanComponent
  ],
  imports: [
    CommonModule,
    PricingPlanRoutingModule
  ]
})
export class ParkingPlanModule { }

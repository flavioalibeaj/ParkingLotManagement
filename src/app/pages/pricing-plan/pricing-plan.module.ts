import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlanComponent } from './pricing-plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PricingPlanRoutingModule } from './pricing-plan-routing.module';
import { SinglePlanComponent } from './single-plan/single-plan.component';


@NgModule({
  declarations: [
    PricingPlanComponent,
    SinglePlanComponent,
  ],
  imports: [
    CommonModule,
    PricingPlanRoutingModule,
    ReactiveFormsModule
  ]
})
export class ParkingPlanModule { }

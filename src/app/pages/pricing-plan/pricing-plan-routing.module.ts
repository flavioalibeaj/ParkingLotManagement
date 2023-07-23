import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricingPlanComponent } from "./pricing-plan.component"
import { SinglePlanComponent } from './single-plan/single-plan.component';

const routes: Routes = [
  { path: "", component: PricingPlanComponent },
  { path: ":type", component: SinglePlanComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingPlanRoutingModule { }

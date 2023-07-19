import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", loadChildren: () => import("./pages/parking-spot/parking-spot.module").then(m => m.ParkingSpotModule) },
  { path: "logs", loadChildren: () => import("./pages/logs/logs.module").then(m => m.LogsModule) },
  { path: "subscribers", loadChildren: () => import("./pages/subscribers/subscribers.module").then(m => m.SubscribersModule) },
  { path: "pricing-plan", loadChildren: () => import("./pages/pricing-plan/pricing-plan.module").then(m => m.ParkingPlanModule) },
  { path: "subscriptions", loadChildren: () => import("./pages/subscription/subscription.module").then(m => m.SubscriptionModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

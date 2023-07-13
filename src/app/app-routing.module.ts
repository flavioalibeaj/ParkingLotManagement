import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "logs", loadChildren: () => import("./pages/logs/logs.module").then(m => m.LogsModule) },
  { path: "subscribers", loadChildren: () => import("./pages/subscribers/subscribers.module").then(m => m.SubscribersModule) },
  { path: "pricing-plan", loadChildren: () => import("./pages/pricing-plan/pricing-plan.module").then(m => m.ParkingPlanModule) },
  { path: "parking-spots", loadChildren: () => import("./pages/parking-spot/parking-spot.module").then(m => m.ParkingSpotModule) },
  { path: "subscriptions", loadChildren: () => import("./pages/subscription/subscription.module").then(m => m.SubscriptionModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

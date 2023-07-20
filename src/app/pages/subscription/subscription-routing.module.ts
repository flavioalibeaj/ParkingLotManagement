import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';
import { SingleSubComponent } from './single-sub/single-sub.component';

const routes: Routes = [
  { path: "", component: SubscriptionComponent },
  { path: ":id", component: SingleSubComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }

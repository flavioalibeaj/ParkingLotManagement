import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribersComponent } from './subscribers.component';
import { SingleSubscriberComponent } from './single-subscriber/single-subscriber.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  { path: "new", component: NewComponent },
  { path: "", component: SubscribersComponent },
  { path: ":id", component: SingleSubscriberComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }

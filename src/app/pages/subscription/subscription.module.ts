import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';
import { SingleSubComponent } from './single-sub/single-sub.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubscriptionComponent,
    SingleSubComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    ReactiveFormsModule
  ]
})
export class SubscriptionModule { }

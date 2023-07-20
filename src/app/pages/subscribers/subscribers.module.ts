import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { SubscribersComponent } from './subscribers.component';
import { SingleSubscriberComponent } from './single-subscriber/single-subscriber.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SubscribersComponent,
    SingleSubscriberComponent
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    ReactiveFormsModule,
  ]
})
export class SubscribersModule { }

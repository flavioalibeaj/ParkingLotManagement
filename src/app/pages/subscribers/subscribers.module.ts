import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { SubscribersComponent } from './subscribers.component';
import { SingleSubscriberComponent } from './single-subscriber/single-subscriber.component';


@NgModule({
  declarations: [
    SubscribersComponent,
    SingleSubscriberComponent
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule
  ]
})
export class SubscribersModule { }

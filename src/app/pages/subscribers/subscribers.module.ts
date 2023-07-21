import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { SubscribersComponent } from './subscribers.component';
import { SingleSubscriberComponent } from './single-subscriber/single-subscriber.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewComponent } from './new/new.component';



@NgModule({
  declarations: [
    SubscribersComponent,
    SingleSubscriberComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    ReactiveFormsModule,
  ]
})
export class SubscribersModule { }

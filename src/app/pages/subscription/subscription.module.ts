import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';
import { SingleSubComponent } from './single-sub/single-sub.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewComponent } from './new/new.component';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    SubscriptionComponent,
    SingleSubComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class SubscriptionModule { }

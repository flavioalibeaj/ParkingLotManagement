import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingSpotComponent } from './parking-spot.component';

import { ParkingSpotRoutingModule } from './parking-spot-routing.module';


@NgModule({
  declarations: [
    ParkingSpotComponent
  ],
  imports: [
    CommonModule,
    ParkingSpotRoutingModule
  ]
})
export class ParkingSpotModule { }

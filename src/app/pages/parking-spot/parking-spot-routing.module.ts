import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingSpotComponent } from './parking-spot.component';

const routes: Routes = [
  { path: "", component: ParkingSpotComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingSpotRoutingModule { }

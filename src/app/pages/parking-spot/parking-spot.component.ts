import { Component, OnInit } from '@angular/core';
import { ParkingSpot } from 'src/app/models/parking-spot';
import { ParkingSpotService } from 'src/app/services/parkingSpot/parking-spot.service';

@Component({
  selector: 'app-parking-spot',
  templateUrl: './parking-spot.component.html',
  styleUrls: ['./parking-spot.component.css']
})
export class ParkingSpotComponent implements OnInit {

  allSpots!: ParkingSpot[]

  constructor(private parkingSpotService: ParkingSpotService) { }

  ngOnInit(): void {
    this.getAllSpots()
  }

  getAllSpots() {
    this.parkingSpotService.getAllSpots().subscribe({
      next: (spots: ParkingSpot[]) => {
        this.allSpots = Array.from(spots)
      },
      error: (err) => {
        console.log("Error", err)
      }
    })
  }

}

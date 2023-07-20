import { Component, OnInit } from '@angular/core';
import { ParkingSpot } from 'src/app/models/parking-spot';
import { ParkingSpotService } from 'src/app/services/parkingSpot/parking-spot.service';

@Component({
  selector: 'app-parking-spot',
  templateUrl: './parking-spot.component.html',
  styleUrls: ['./parking-spot.component.css']
})
export class ParkingSpotComponent implements OnInit {

  allSpots!: ParkingSpot

  constructor(private parkingSpotService: ParkingSpotService) { }

  ngOnInit(): void {
    this.getAllSpots()
  }

  getAllSpots() {
    this.parkingSpotService.getAllSpots().subscribe({
      next: (spots: ParkingSpot) => {
        this.allSpots = spots
      },
      error: (err) => {
        console.log("Error", err)
      }
    })
  }

  getRange(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  getSpotStatusClass(spotNumber: number): string {
    const spotStatus = this.getSpotStatus(spotNumber);

    switch (spotStatus) {
      case 'freeRegularSpots':
        return 'bg-success';
      case 'freeReservedSpots':
        return 'bg-info';
      case 'occupiedRegularSpots':
        return 'bg-danger';
      case 'occupiedReservedSpots':
        return 'bg-warning';
      default:
        return '';
    }
  }

  private getSpotStatus(spotNumber: number): string {
    if (this.allSpots.freeRegularSpots >= spotNumber) {
      return 'freeRegularSpots';
    } else if (this.allSpots.freeReservedSpots >= spotNumber - this.allSpots.freeRegularSpots) {
      return 'freeReservedSpots';
    } else if (this.allSpots.occupiedRegularSpots >= spotNumber - this.allSpots.freeRegularSpots - this.allSpots.freeReservedSpots) {
      return 'occupiedRegularSpots';
    } else if (this.allSpots.occupiedReservedSpots >= spotNumber - this.allSpots.freeRegularSpots - this.allSpots.freeReservedSpots - this.allSpots.occupiedRegularSpots) {
      return 'occupiedReservedSpots';
    } else {
      return '';
    }
  }

}

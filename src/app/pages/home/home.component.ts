import { Component, OnInit } from '@angular/core';
import { ParkingSpotService } from '../../services/parkingSpot/parking-spot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private psService: ParkingSpotService) { }

  ngOnInit(): void {
    // this.getAll()
  }


  getAll() {
    this.psService.getAllSpots().subscribe(
      (res) => {
        console.log("Result is", res)
      },
      (err) => {
        console.log("error", err)
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { ParkingSpotService } from '../services/parking-spot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ParkingSpotService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.service.getAllSpots().subscribe(res => {
      console.log(res)
    })
  }

}

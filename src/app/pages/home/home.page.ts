import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/Trip';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  trips : Trip[];

  constructor(private trip : TripService) {
    this.trips = [];
  }

  ionViewWillEnter() {
    this.trip.getTrip$().subscribe((apiTrips)=>{
      this.trips = apiTrips;
    });
  }

}
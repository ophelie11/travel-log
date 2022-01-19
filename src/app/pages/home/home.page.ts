import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Trip } from 'src/app/models/Trip';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements ViewWillEnter {

  trips : Trip[];

  constructor(private trip : TripService) {
    this.trips = [];
  }

  ionViewWillEnter(): void {
    this.trip.getTrip$().subscribe((apiTrips)=>{
      this.trips = apiTrips;
    });
  }

  deleteTrip(id : string): void {
    this.trip.deleteTrip$(id).subscribe(() => {
      
    });
  }
}
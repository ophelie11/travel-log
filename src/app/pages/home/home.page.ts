import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Trip } from 'src/app/models/Trip';
import { TripService } from 'src/app/services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements ViewWillEnter {

  trips : Trip[];
  searchingText: string;
  userId: string;
  //tripId: string;

  constructor(private trip : TripService, private router: Router) {
    this.trips = [];
  }

  ionViewWillEnter(): void {
    this.trip.getTrip$().subscribe((apiTrips)=>{
      this.trips = apiTrips;
    });
  }

  deleteTrip(id : string): void {
    this.trip.deleteTrip$(id).subscribe(() => {
      const index = this.trips.findIndex((element) => element.id === id);
      console.log(index);
      this.trips.splice(index, 1);
    });
  }

  redirectMap(id: string) {
    this.router.navigateByUrl(`/map/${id}`);
  }

  search(){
    this.trip.getTrip$();
  }
}
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/Trip';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePlace } from 'src/app/models/createPlace';
import { CreateTrip } from 'src/app/models/createTrip';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

 
  getTrip: CreateTrip;
  tripId: string;
 

  constructor(private trip : TripService, private router: Router, private route: ActivatedRoute) {

    this.getTrip = {
      title: undefined,
      description: undefined,
    };
    
    this.tripId= this.route.snapshot.params.id;

    this.trip.getOneTrip(this.tripId).subscribe(trip => {
      this.getTrip.title = trip.title;
    })
  }

  redirectCreatePlace(id: string) {
    this.router.navigateByUrl(`/create-place/${id}`);
  }

  ngOnInit() {
  }

}

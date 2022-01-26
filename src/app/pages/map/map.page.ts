import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/Trip';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

 
  tripTitle: string;
  

  constructor(private trip : TripService, private router: Router, private route: ActivatedRoute) {
    
    this.tripTitle = this.route.snapshot.params.title;
  }

  ngOnInit() {
  }

}

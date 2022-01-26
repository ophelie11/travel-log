import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTrip } from 'src/app/models/createTrip';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.page.html',
  styleUrls: ['./edit-trip.page.scss'],
})
export class EditTripPage {

  editTrip : CreateTrip;
  tripId: string;

  constructor(private router: Router, private trip : TripService, private route: ActivatedRoute) {
    this.editTrip = {
      title: undefined,
      description: undefined,
    };
    this.tripId = this.route.snapshot.params.id;
    
    this.trip.getOneTrip(this.tripId).subscribe(trip => {
      this.editTrip.title = trip.title;
      this.editTrip.description = trip.description;
    })
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.trip.editTrip$(this.tripId, this.editTrip).subscribe({
      next: () => this.router.navigateByUrl("/"),
    });
  }

  }

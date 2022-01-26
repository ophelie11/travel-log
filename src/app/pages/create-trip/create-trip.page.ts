import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTrip } from 'src/app/models/createTrip';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})

export class CreateTripPage {

  createTrip : CreateTrip;

  createTripError: boolean;

  constructor(private router: Router, private trip : TripService) {
    this.createTrip = {
      title: undefined,
      description: undefined,
    };
  }

   onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.trip.createTrip$(this.createTrip).subscribe({
      next: () => this.router.navigateByUrl("/")
    });
  }

}

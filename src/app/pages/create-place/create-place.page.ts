import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatePlace } from 'src/app/models/createPlace';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
})

export class CreatePlacePage {

  createPlace : CreatePlace;

  createPlaceError: boolean;

  constructor(private router: Router, private place : PlaceService) {
    this.createPlace = {
      name: undefined,
      description: undefined,
      location: undefined,
      tripId: undefined,
      pictureUrl: undefined,
    };
  }

   onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    this.createPlaceError = false;

    this.place.createPlace$(this.createPlace).subscribe({
      next: () => this.router.navigateByUrl("/map"),
      //error: (err) => {
      //  this.loginError = true;
      //  console.warn(`Authentication failed: ${err.message}`);
      //},
    });
  }

}
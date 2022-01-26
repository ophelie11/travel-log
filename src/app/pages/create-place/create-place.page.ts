import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatePlace } from 'src/app/models/createPlace';
import { QimgImage } from 'src/app/models/qimg-image';
import { PlaceService } from 'src/app/services/place.service';
import { PictureService } from 'src/app/services/picture.service';
import { Photo } from '@capacitor/camera';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
})

export class CreatePlacePage {

  createPlace : CreatePlace;

  createPlaceError: boolean;

  takeAndUploadPicture : QimgImage;

  constructor(private router: Router, private place : PlaceService, private picture : PictureService) {
    this.createPlace = {
      name: undefined,
      description: undefined,
      location: undefined,
      tripId: undefined,
      pictureUrl: undefined,
    };
    this.takeAndUploadPicture = {
      id: undefined,
      size: undefined,
      url: undefined,
      createdAt: undefined,
    }
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

  takePicture() {

    this.picture.takeAndUploadPicture().subscribe({
      next: () => this.router.navigateByUrl("/"),
      //error: (err) => {
      //  this.loginError = true;
      //  console.warn(`Authentication failed: ${err.message}`);
      //},
    });
  }
}
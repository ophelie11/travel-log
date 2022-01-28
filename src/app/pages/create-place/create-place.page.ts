import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePlace } from 'src/app/models/createPlace';
import { QimgImage } from 'src/app/models/qimg-image';
import { PlaceService } from 'src/app/services/place.service';
import { PictureService } from 'src/app/services/picture.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LatLng, latLng } from 'leaflet';


@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
})

export class CreatePlacePage {

  createPlace : CreatePlace;

  createPlaceError: boolean;

  picture? : QimgImage;

  tripTitle: string;

  constructor(private router: Router, private place : PlaceService, private pictureService : PictureService, private geolocation: Geolocation, private route: ActivatedRoute) {
    this.createPlace = {
      href: undefined,
      name: undefined,
      description: undefined,
      location: undefined,
      tripId: undefined,
      pictureUrl: undefined,
      categorie: undefined,
    };

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      this.createPlace.location = latLng(resp.coords.latitude, resp.coords.longitude);
    })

    this.createPlace.tripId = this.route.snapshot.params.title;

    }

  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    this.createPlaceError = false;

    console.log(this.createPlace);

    this.place.createPlace$(this.createPlace).subscribe({
      next: () => this.router.navigateByUrl("/map"), 
    });
  }

  takePicture() {

    this.pictureService.takeAndUploadPicture().subscribe({
      next: picture => this.picture = picture
    });
  }

  radioChecked(categorie : string) : void {
    console.log(categorie)
    this.createPlace.categorie = categorie;
  }
}
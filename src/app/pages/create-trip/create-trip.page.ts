import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTrip } from 'src/app/models/createTrip';
import { TripService } from 'src/app/services/trip.service';
import { alertController } from '@ionic/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})

export class CreateTripPage {
  title: string;
  description: string;
  createTrip : CreateTrip;
  createTripError: boolean;

  constructor(private router: Router, private trip : TripService, public alertController: AlertController) {
    this.createTrip = {
      title: undefined,
      description: undefined,
    };
  }
  
   onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
  //   this.createTripError = false;
  //   let createTrip:CreateTrip = {
  //     "title": this.title,
  //     "description": this.description
  //   }
  //   this.trip.createTrip$(this.createTrip).subscribe(trip => {
  //     this.router.navigate(['/'], { state: { show: "true" } });
  //     this.title=this.description="";
  //   }, err => {
  //     if(err.type === "UNAUTHORIZED") {
  //       this.createTripError = true;
  //     } else {
  //       this.showNetworkPopUpAlert();
  //     }
  //   });
  // }

  //   showNetworkPopUpAlert(): void {
  //     this.alertController.create({
  //       header: 'Network issue',
  //       message: 'The request cannot be made to the server. Please check your connection and try again.',
  //       buttons: ['OK'],
  //     }).then(res => {
  //       res.present();
  //     });
  //   }

    this.trip.createTrip$(this.createTrip).subscribe({
      next: () => this.router.navigateByUrl("/")
    });
  }

}

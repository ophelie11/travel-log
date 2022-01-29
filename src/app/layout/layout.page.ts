import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from "rxjs/operators";
import { LatLng, latLng, MapOptions, tileLayer, Map, Marker, marker } from 'leaflet';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { defaultIcon } from 'src/assets/icon/default-marker';
import { CreatePlace } from '../models/createPlace';
import { PlaceService } from '../services/place.service';

declare type PageTab = {
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
};

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})


export class LayoutPage implements OnInit {
  mapOptions?: MapOptions;
  tabs: PageTab[];
  isLoginLayout = false;
  isMapLayout = false;
  #mapCenter?: LatLng;
  get mapCenter(): LatLng { return this.#mapCenter }
  set mapCenter(value: LatLng) { this.#mapCenter = value }

  mapMarkers: Marker[];
  onePlace: CreatePlace;

  constructor(private route: ActivatedRoute, private router: Router, private geolocation: Geolocation, private place: PlaceService) {

    this.onePlace = {
      name: undefined,
      description: undefined,
      location: undefined,
      tripId: undefined,
      pictureUrl: undefined,
      categorie: undefined
    };

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const data = this.getLastChildData(this.router.routerState.snapshot.root);
      this.isLoginLayout = data?.setLoginLayout ?? false;
      this.isMapLayout = data?.setMapLayout ?? false;
    });

    this.place.getPlaces$().subscribe(places => {
      places.forEach(place => {
        this.onePlace.name = place.name;
        this.onePlace.location = place.location;
        this.mapMarkers = [
          marker([ place.location.coordinates[0], place.location.coordinates[1] ], { icon: defaultIcon }).bindTooltip(place.name)    
      ];
      });
      
    })
    console.log(this.onePlace)

    this.geolocation.getCurrentPosition().then((resp) => {
      this.mapCenter = latLng(resp.coords.latitude, resp.coords.longitude);
    }).catch(() => this.mapCenter = latLng(46.778690, 6.641400)).then(() => {
      this.mapOptions = {
        trackResize: false,
        layers: [
          tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18 }
          )
        ],
        zoom: 13,
        center: this.mapCenter,
        zoomControl: false,

      };
    })

    

  };

  ngOnInit() {
  }

  onMapReady(map: Map) {
    setTimeout(() => {
      // console.log(map);
      map.invalidateSize();
    }, 0);
  }


  private getLastChildData(route: ActivatedRouteSnapshot) {
    if (route.firstChild) {
      return this.getLastChildData(route.firstChild);
    }
    return route.data;
  };


}

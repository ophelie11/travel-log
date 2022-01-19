import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from "rxjs/operators";
import { LatLng, latLng, MapOptions, tileLayer, Map } from 'leaflet';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

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
  mapOptions: MapOptions;
  tabs: PageTab[];
  isLoginLayout = false;
  isMapLayout = false;
  mapCenter: LatLng;

  constructor(private route: ActivatedRoute, private router: Router, private geolocation: Geolocation) {
    this.mapCenter = latLng(46.778690, 6.641400);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const data = this.getLastChildData(this.router.routerState.snapshot.root);
      this.isLoginLayout = data?.setLoginLayout ?? false;
      this.isMapLayout = data?.setMapLayout ?? false;
    });
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

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      this.mapCenter = latLng(resp.coords.latitude, resp.coords.longitude);
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

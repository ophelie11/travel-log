import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from "rxjs/operators";
import { latLng, MapOptions, tileLayer } from 'leaflet';

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

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const data = this.getLastChildData(this.route.snapshot);
      this.isLoginLayout = data?.setLoginLayout ?? false;
      console.log(this.isLoginLayout)
    });

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  ngOnInit() {
  }

  private getLastChildData(route: ActivatedRouteSnapshot) {
    if (route.firstChild) {
      return this.getLastChildData(route.firstChild);
    }
    return route.data;
  }

}

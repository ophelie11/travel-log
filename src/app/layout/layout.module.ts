import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayoutPageRoutingModule } from './layout-routing.module';

import { LayoutPage } from './layout.page';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutPageRoutingModule,
    LeafletModule
  ],
  declarations: [LayoutPage],
  providers: [
    Geolocation
  ]
})
export class LayoutPageModule { }

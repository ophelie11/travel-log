import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from "@ionic/storage-angular";

// Import Angular's httpClientModule
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LayoutPageModule } from './layout/layout.module';

//Import LeafletModule for the map
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AuthInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, LayoutPageModule, IonicStorageModule.forRoot(), LeafletModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule { }

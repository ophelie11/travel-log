import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateTrip } from '../models/createTrip';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) {}

  createTrip$(createTrip : CreateTrip){
    return this.http.post(environment.apiUrl + "/trips", createTrip);
  }

  getTrip$(){
    return this.http.get<Trip[]>(environment.apiUrl + "/trips")
  }

}

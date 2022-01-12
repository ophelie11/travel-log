import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTrip } from '../models/createTrip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) {}

  createTrip$(createTrip : CreateTrip){
    return this.http.post("https://devmobil-voice-it.herokuapp.com/api/trips", createTrip);
  }

}

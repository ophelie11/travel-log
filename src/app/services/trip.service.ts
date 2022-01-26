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

  getOneTrip(id : string){
    return this.http.get<Trip>(environment.apiUrl + "/trips/" + id)
  }

  deleteTrip$(id : string){
    return this.http.delete(environment.apiUrl + "/trips/" + id)
  }

  editTrip$(id : string, editTrip : CreateTrip){
   return this.http.patch(environment.apiUrl + "/trips/" + id, editTrip)
 }

}

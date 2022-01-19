import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreatePlace } from '../models/createPlace';
import { Trip } from '../models/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {}

  createPlace$(createPlace : CreatePlace){
    return this.http.post(environment.apiUrl + "/places", createPlace);
  }

  getPlace$(){
    return this.http.get<Trip[]>(environment.apiUrl + "/places")
  }

  deletePlace$(id : string){
    return this.http.delete(environment.apiUrl + "/places/" + id)
  }

  // updateTrip$(id : string){
  //   return this.http.patch(environment.apiUrl + "/trips/" + id)
  // }
}

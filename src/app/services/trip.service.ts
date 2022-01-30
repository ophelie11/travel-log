import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateTrip, Trip } from '../models/createTrip';



@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) {}

  createTrip$(createTrip : CreateTrip){
    return this.http.post(environment.apiUrl + "/trips", createTrip);
  }

  getTrip$(userId : string, search: string = ""){
    const API_URL = environment.apiUrl;
    const url = search == "" ? `${API_URL}/trips?user=${userId}&sort=-createdAt&order=asc` : `${API_URL}/trips?user=${userId}&search=${search}&sort=-createdAt&order=asc`;
    return this.http.get<Trip[]>(url)
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

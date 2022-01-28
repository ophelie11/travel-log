import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreatePlace, RawPlace, rawPlaceToPlace, placeToRawPlace } from '../models/createPlace';


@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {}

  createPlace$(createPlace : CreatePlace): Observable<CreatePlace>{
    // Converts trip to create to an API compatible model
    const body = placeToRawPlace(createPlace);
    return (
      this.http
        .post<RawPlace>(`${environment.apiUrl}/places`, body)
        // Converts the trip returned from the API to a model compatible with our application.
        .pipe(map(rawPlaceToPlace))
    );
  }

  getPlace$(placeId: string): Observable<CreatePlace>{
    return (
      this.http
        .get<RawPlace>(`${environment.apiUrl}/places/${placeId}`)
        // Converts the trip returned from the API to a model compatible with our application.
        .pipe(map(rawPlaceToPlace))
    );
  }

  deletePlace$(id : string){
    return this.http.delete(environment.apiUrl + "/places/" + id)
  }

  // updateTrip$(id : string){
  //   return this.http.patch(environment.apiUrl + "/trips/" + id)
  // }
}

import {GeoJsonPoint} from 'GeoJson';
import { LatLng } from "leaflet";

/**
 * Represents a Place model as used throughout the application
 */
export class CreatePlace {
  id?: string;
  href: string
  name: string;
  description: string;
  location: GeoJsonPoint;
  tripId: string;
  pictureUrl: string;
  categorie: String;
}

/**
 * Represents a Place model as saved and returned by the API
 */
export class RawPlace {
  id?: string;
  href: string;
  name: string;
  description: string;
  location: GeoJsonPoint;
  tripId: string;
  pictureUrl: string;
}

/**
 * Converts a RawPlace model to a Place model.
 *
 * Should be used whenever we get one or more places from the API.
 *
 * @param raw The RawPlace model from the API
 * @return An instance of our custom Place model
 */
export function rawPlaceToPlace(raw: RawPlace): CreatePlace {
  const decodedData = JSON.parse(raw.description);
  return {
    id: raw.id,
    href: raw.href,
    name: raw.name,
    description: decodedData.description,
    location: raw.location,
    tripId: raw.tripId,
    pictureUrl: raw.pictureUrl,
    // Replace following lines with you custom properties
    categorie: decodedData.categorie,
  };
}

/**
 * Converts a Trip model to a RawPlace model.
 *
 * Should be used whenever we want to send data to the API.
 *
 * @param place The custom Place model.
 * @returns An instance of RawPlace destined to the API.
 */
export function placeToRawPlace(place: CreatePlace): RawPlace {
  const encodedData = JSON.stringify({
    description: place.description,
    // Replace following lines with your custom properties
    categorie: place.categorie,
  });
  return {
    id: place.id,
    href: place.href,
    name: place.name,
    description: encodedData,
    location: place.location,
    tripId: place.tripId,
    pictureUrl: place.pictureUrl,
  }; 
}
export type CreatePlace = {
    name: string;
    description: string;
    location: LatLng;
    tripId: string;
    pictureUrl: string;
};
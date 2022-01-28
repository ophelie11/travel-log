import { LatLng } from "leaflet";

export type CreatePlace = {
    name: string;
    description: string;
    location: LatLng;
    tripId: string;
    pictureUrl: string;
};
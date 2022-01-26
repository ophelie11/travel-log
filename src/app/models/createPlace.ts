import {GeoJsonPoint} from 'geojson'

export type CreatePlace = {
    name: string;
    description: string;
    location: GeoJsonPoint;
    tripId: string;
    pictureUrl: string;
};
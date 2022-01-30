export type Trip = {
  "id": string,
  "href": string,
  "title": string,
  "description": string,
  "placesCount": number,
  "userId": string,
  "userHref": string,
  "createdAt": Date,
  "updatedAt": Date
};

export type CreateTrip = {
  "title": string,
  "description": string
};
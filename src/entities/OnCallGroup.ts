export interface Location {
  lat: number;
  lng: number;
}

export interface Pharmacy {
  _id?: string;
  name: string;
  phone: string;
  address: string;
  location?: Location;
}

export interface OnCallGroup {
  _id?: string;
  name?: string;
  day: string;
  pharmacies: Pharmacy[];
  group: string;
}

export interface Calendar{
  month: Array<OnCallGroup>;
}
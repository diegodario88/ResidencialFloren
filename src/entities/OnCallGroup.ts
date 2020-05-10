export interface Location {
  lat: number;
  lng: number;
}

export interface Pharmacy {
  _id?: string;
  name: string;
  telefone: string;
  endereco: string;
  location?: Location;
}

export interface OnCallGroup {
  _id?: string;
  name?: string;
  farmacias?: Pharmacy[];
  day: string;
  pharmacys: Pharmacy[];
  group: string;
}

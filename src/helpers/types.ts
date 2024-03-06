export interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  state?: string | null;
  country_code: string;
  hotel_rating?: number | null;
  phone_number?: string | null;
  website?: string | null;
  image?: string | null;
}

export interface Destination {
  id: number;
  name: string;
}

export interface SearchFormData {
  destination: string | null;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfBabies: number;
}

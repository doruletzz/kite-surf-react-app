import { Entity, Error } from "../app/types";

export interface FilterOption {
  probability: number;
  country: string;
  isApplied: boolean;
}

export interface FavouriteSpot extends Entity {
  createdAt: Date;
  spot: Spot | number;
}

export interface Spot extends Entity {
  createdAt: Date;
  name: string;
  country: string;
  lat: number;
  long: number;
  probability: number;
  month: string;
}

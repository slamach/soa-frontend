export interface Coordinates {
  x: number;
  y: number;
}

export interface Location {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
}

export interface Route {
  id: number;
  name: string;
  coordinates: Coordinates;
  creationDate: string;
  from: Location;
  to: Location;
  distance: number;
}

export interface BasicResponse<T = { [K: string]: unknown }> {
  payload: T;
}

export interface BasicErrorResponse {
  message: string;
}

export interface RouteUpdateDTO {
  id: number;
  name?: string;
  x?: number;
  y?: number;
  creationDate?: string;
  distance?: number;
}

export interface RouteAddDTO {
  name: string;
  coordinates: Coordinates;
  from: Partial<Location>;
  to: Partial<Location>;
  distance: number;
}

export interface RouteFilterDTO {
  nameFilter?: string;
  coordinatesXFilter?: number;
  coordinatesYFilter?: number;
  distanceFilter?: number;
}

export interface LocationGroups {
  [K: string]: number;
}

export interface OrderedRoutesDTO {
  idFrom: number;
  idTo: number;
  orderBy: string;
}

export interface LengthFilterDTO {
  idFrom: number;
  idTo: number;
  length: 'SHORTEST' | 'LONGEST';
}

export interface Pageable {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

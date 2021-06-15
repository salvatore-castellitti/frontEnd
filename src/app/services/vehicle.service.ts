import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Vehicle} from "../modules/vehicle";


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicleUrl = "api/vehicles/";

  getVehicles(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.vehicleUrl)
      .pipe(
        catchError(this.handleError<Vehicle[]>('getVehicles', []))
      )
  }

  /** GET vehicle by id. Will 404 if id not found */
  getVehicle(id: number): Observable<Vehicle> {
    const url = `${this.vehicleUrl}/${id}`;
    return this.http.get<Vehicle>(url).pipe(
      catchError(this.handleError<Vehicle>(`getVehicle id=${id}`))
    );
  }

  /** PUT: update the vehicle on the server */
  updateVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.put(this.vehicleUrl, vehicle, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateVehicle'))
    );
  }

  /** POST: add a new vehicle to the server */
  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.vehicleUrl, vehicle, this.httpOptions).pipe(
      catchError(this.handleError<Vehicle>('addCustomer'))
    );
  }

  /** DELETE: delete the vehicle from the server
  deleteVehicle(id: number): Observable<Vehicle> {
    const url = `${this.vehicleUrl}/${id}`;

    return this.http.delete<Vehicle>(url, this.httpOptions).pipe(
      catchError(this.handleError<Vehicle>('deleteVehicle'))
    );
  }
   */

  deleteVehicle(id: number): Observable<any>{
    return this.http.delete(this.vehicleUrl + id)
  }

  constructor(private http: HttpClient) { }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}

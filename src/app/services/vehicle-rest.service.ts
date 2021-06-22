import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vehicle} from "../modules/vehicle";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehicleRESTService {

  private baseUrl = 'http://localhost:8080/api/v1/vehicles'

  constructor(private http: HttpClient) { }

  getVehicleList(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.baseUrl}`)
  }

  createVehicle(vehicle: Vehicle): Observable<Object>{
    return this.http.post(`${this.baseUrl}`, vehicle)
  }

  getVehicleById(id: number): Observable<Vehicle>{
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}`)
  }

  deleteVehicle(id: number): Observable<Object>{
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  getFreeVehicles(sDate: Date, eDate: Date): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.baseUrl}/${sDate}/${eDate}`)
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vehicle} from "../modules/vehicle";
import {BehaviorSubject, Observable} from "rxjs";
import {Customer} from "../modules/customer";

@Injectable({
  providedIn: 'root'
})
export class VehicleRESTService {

  private baseUrl = 'http://localhost:8080/api/v1/vehicles'

  public currentCustomer: Observable<Customer>;
  public currentCustomerSubject: BehaviorSubject<Customer>
  header: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentCustomerSubject= new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('currentCustomer')))
    this.currentCustomer = this.currentCustomerSubject.asObservable();
  }

  setHeaders(){
    this.header = new HttpHeaders({
      authorization:'Bearer ' + this.currentCustomerSubject.value.token,
      "Content-Type":"application/json; charset=UTF-8"
    })
  }


  getVehicleList(): Observable<Vehicle[]>{
    this.setHeaders()
    return this.http.get<Vehicle[]>(`${this.baseUrl}`, {headers: this.header})
  }

  createVehicle(vehicle: Vehicle): Observable<Object>{
    this.setHeaders()
    return this.http.post(`${this.baseUrl}`, vehicle, {headers:this.header})
  }

  getVehicleById(id: number): Observable<Vehicle>{
    this.setHeaders()
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}`, {headers: this.header})
  }

  deleteVehicle(id: number): Observable<Object>{
    this.setHeaders()
    return this.http.delete(`${this.baseUrl}/${id}`, {headers: this.header})
  }

  getFreeVehicles(sDate: Date, eDate: Date): Observable<Vehicle[]>{
    this.setHeaders()
    return this.http.get<Vehicle[]>(`${this.baseUrl}/${sDate}/${eDate}`,{headers: this.header})
  }
}

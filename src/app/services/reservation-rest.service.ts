import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Reservation} from "../modules/reservation";
import {map} from "rxjs/operators";
import {Customer} from "../modules/customer";

@Injectable({
  providedIn: 'root'
})
export class ReservationRESTService {

  private baseUrl = 'http://localhost:8080/api/v1/reservations'

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

  getReservationList(): Observable<Reservation[]>{
    this.setHeaders()
    return this.http.get<Reservation[]>(`${this.baseUrl}`, {headers:this.header} );
  }

  createReservation(reservation: Reservation): Observable<Object>{
    this.setHeaders()
    return this.http.post(`${this.baseUrl}`, reservation, {headers: this.header})
  }

  getReservationsCurrent(user): Observable<Reservation[]>{
    this.setHeaders()
    return this.http.get<Reservation[]>(`${this.baseUrl}`, {headers: this.header})
      .pipe(map((res: any) => {
          return res.filter(post => {
            return post.user.id == user.id ;
          })
        })
      )
  }

  deleteReservation(id: number): Observable<Object>{
    this.setHeaders()
    return this.http.delete(`${this.baseUrl}/${id}`, {headers: this.header})
  }
}

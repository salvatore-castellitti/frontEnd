import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../modules/reservation";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReservationRESTService {

  private baseUrl = 'http://localhost:8080/api/v1/reservations'
  constructor(private http: HttpClient) { }

  getReservationList(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.baseUrl}`);
  }

  createReservation(reservation: Reservation): Observable<Object>{
    return this.http.post(`${this.baseUrl}`, reservation)
  }

  getReservationsCurrent(user): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.baseUrl}`)
      .pipe(map((res: any) => {
          return res.filter(post => {
            return post.user.id == user.id ;
          })
        })
      )
  }

  deleteReservation(id: number): Observable<Object>{
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}

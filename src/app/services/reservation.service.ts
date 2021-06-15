import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, filter, map, tap} from 'rxjs/operators';
import {Reservation} from "../modules/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationUrl = "api/reservations/";

  getReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.reservationUrl)
      .pipe(
        catchError(this.handleError<Reservation[]>('getReservations', []))
      )
  }
  getReservationsCurrent(idUser: string): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.reservationUrl)
      .pipe(map((res: any) => {
        return res.filter(post => {
          return post.customer == idUser;
        })
      })
    )
  }

  /** GET customer by id. Will 404 if id not found */
  getReservation(id: number): Observable<Reservation> {
    const url = `${this.reservationUrl}/${id}`;
    return this.http.get<Reservation>(url).pipe(
      catchError(this.handleError<Reservation>(`getReservation id=${id}`))
    );
  }

  /** PUT: update the customer on the server */
  updateReservation(customer: Reservation): Observable<any> {
    return this.http.put(this.reservationUrl, customer, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateReservation'))
    );
  }

  /** POST: add a new customer to the server */
  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.reservationUrl, reservation, this.httpOptions).pipe(
      catchError(this.handleError<Reservation>('addReservation'))
    );
  }

  /** DELETE: delete the customer from the server
  deleteCustomer(id: number): Observable<Customer> {
    const url = `${this.customerUrl}/${id}`;

    return this.http.delete<Customer>(url, this.httpOptions).pipe(
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }
   */

  deleteReservation(id: number): Observable<any>{
    return this.http.delete(this.reservationUrl + id)
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

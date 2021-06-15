import { Injectable } from '@angular/core';
import {Customer} from "../modules/customer";
import {Observable, of} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Reservation} from "../modules/reservation";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerUrl = "api/customers/";

  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.customerUrl)
      .pipe(
        catchError(this.handleError<Customer[]>('getCustomer', []))
      )
  }

  getAll(): Observable<any>{
    return this.http.get<any>(this.customerUrl)
  }

  /** GET customer by id. Will 404 if id not found
  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customerUrl}/${id}`;
    return this.http.get<Customer>(this.customerUrl + id).pipe(
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }*/

  getCustomer(idUser: string): Observable<Customer>{
    return this.http.get<Customer>(this.customerUrl + idUser)
      .pipe(map((res: any) => {
          return res
        })
      )
  }



  /** PUT: update the customer on the server */
  updateCustomer(customer: Customer): Observable<any> {
    return this.http.put(this.customerUrl, customer, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  /** POST: add a new customer to the server */
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customerUrl, customer, this.httpOptions).pipe(
      catchError(this.handleError<Customer>('addCustomer'))
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

  deleteCustomer(id: number): Observable<any>{
    return this.http.delete(this.customerUrl + id)
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

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Customer} from "../modules/customer";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerRESTService {

  private baseUrl = 'http://localhost:8080/api/v1/users'

  public currentCustomer: Observable<Customer>;
  public currentCustomerSubject: BehaviorSubject<Customer>

  constructor(private http: HttpClient) {
    this.currentCustomerSubject= new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('currentCustomer')))
    this.currentCustomer = this.currentCustomerSubject.asObservable();
  }

  getUserList(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.baseUrl}`);
  }

  createUser(customer: Customer): Observable<Object>{
    return this.http.post(`${this.baseUrl}`, customer)
  }

  getUserById(id: number): Observable<Customer>{
    return this.http.get<Customer>(`${this.baseUrl}/${id}`)
  }

  deleteUser(id: number): Observable<Object>{
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  public get currentUserValue(): Customer{
    return this.currentCustomerSubject.value;
  }

  login(customer: Customer): Observable<any>{
    const headers = new HttpHeaders(
      customer?{authorization:'Basic '+btoa(customer.username + ':' + customer.password)} : {}
    )
    return this.http.get(`${this.baseUrl}/login`, {headers:headers}).pipe(
      map(response =>{
        if(response){
          localStorage.setItem('currentCustomer', JSON.stringify(response))
          this.currentCustomerSubject.next(<Customer>response)
        }
        return response;
      })
    );
  }

  logout(): Observable<any>{
    return this.http.post(`${this.baseUrl}/logout`,{}).pipe(
      map(response => {
        localStorage.removeItem('currentCustomer');
        this.currentCustomerSubject.next(null)
      })
    );
  }
}

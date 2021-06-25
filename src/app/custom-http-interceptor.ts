import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Customer} from "./modules/customer";
import {CONSTRUCTOR} from "@angular/compiler-cli/ngcc/src/host/esm2015_host";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor{
  public currentCustomerSubject: BehaviorSubject<Customer>

  constructor() {
    this.currentCustomerSubject= new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('currentCustomer')))
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.url.indexOf('http://localhost:8080/api/v1/users/login') == 0 || req.url.indexOf('http://localhost:8080/api/v1/users/logout') == 0)
      return next.handle(req)

      const reqWithAuth = req.clone({
        setHeaders: {
          authorization: `Bearer ${this.currentCustomerSubject.value.token}`,
          "Content-Type":"application/json; charset=UTF-8"
        }
      })
      return next.handle(reqWithAuth)
    }



}

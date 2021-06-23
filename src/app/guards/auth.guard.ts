import {Injectable} from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from "@angular/router";
import {CustomerRESTService} from "../services/customer-rest.service";
import {Customer} from "../modules/customer";

@Injectable(
  {providedIn: 'root'}
)

export class AuthGuard implements CanActivate {
  currentCustomer: Customer;
  constructor(private router: Router,
              private customerService: CustomerRESTService) {
    this.customerService.currentCustomer.subscribe(data => {
      this.currentCustomer = data
    })
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.currentCustomer){
      if(route.data.roles && route.data.roles.indexOf(this.currentCustomer.role) === -1){
        this.router.navigate(['/401']);
        return true;
      }
      return true
    }
    this.router.navigate(['/login']);
    return false;
  }

}

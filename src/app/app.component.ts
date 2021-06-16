import { Component, OnInit } from '@angular/core';
import {CustomerService} from "./services/customer.service";
import {DataService} from "./services/data.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {Customer} from "./modules/customer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Rental Car';
  role: string;
  idUser: string
  profile : any
  currentUser: Customer;

  ngOnInit(): void{
    window.localStorage.setItem('role', 'customer');
    window.localStorage.setItem('idUser', '13');
    this.role = window.localStorage.getItem('role');
    this.idUser = window.localStorage.getItem('idUser')
  }

  constructor(private customerService: CustomerService,
              private data: DataService,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  getProfile(): void{
    this.customerService.getCustomer(this.idUser).subscribe( item => {
      this.profile = item
      this.data.changeModelValue(this. profile)
    })
    this.router.navigate(['/form-add'], { state: {type: 'customer'} });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

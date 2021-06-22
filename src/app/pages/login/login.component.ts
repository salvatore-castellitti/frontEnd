import { Component, OnInit } from '@angular/core';
import {CustomerRESTService} from "../../services/customer-rest.service";
import {Customer} from "../../modules/customer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customer : Customer = new Customer();
  errorMessage: string;
  constructor(private customerService: CustomerRESTService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.customerService.currentCustomer){
      this.router.navigate(['/carPark'])
      return;
    }
  }

  login(){
    this.customerService.login(this.customer).subscribe(data => {
      console.log(this.customer)
      this.router.navigate(['/carPark'])

    }, err => {
      this.errorMessage='Username or Password incorrect'
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {CustomerService} from "./services/customer.service";
import {DataService} from "./services/data.service";
import {Router} from "@angular/router";

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

  ngOnInit(): void{
    window.localStorage.setItem('role', 'customer');
    window.localStorage.setItem('idUser', '13');
    this.role = window.localStorage.getItem('role');
    this.idUser = window.localStorage.getItem('idUser')
  }

  constructor(private customerService: CustomerService,
              private data: DataService,
              private router: Router) {
  }

  getProfile(): void{
    this.customerService.getCustomer(this.idUser).subscribe( item => {
      this.profile = item
      this.data.changeModelValue(this. profile)
    })
    this.router.navigate(['/form-add'], { state: {type: 'customer'} });
  }
}

import {Component, OnInit} from '@angular/core';
import {CustomerService} from "./services/customer.service";
import {DataService} from "./services/data.service";
import {Router} from "@angular/router";
import {Customer} from "./modules/customer";
import {CustomerRESTService} from "./services/customer-rest.service";
import {Role} from "./modules/role";

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
  currentUser: Customer = new Customer();


  ngOnInit(): void{
    this.role = window.localStorage.getItem('role');
    this.idUser = window.localStorage.getItem('idUser')


  }

  constructor(private customerService: CustomerService,
              private data: DataService,
              private router: Router,
              private customerRestService: CustomerRESTService,
              ) {
    this.customerRestService.currentCustomer.subscribe(data => {
      this.currentUser = data
      if(this.currentUser){
        window.localStorage.setItem('role', this.currentUser.role);
        window.localStorage.setItem('idUser', String(this.currentUser.id));

      }
    })
  }

  getProfile(): void{
    this.customerRestService.getUserById(+this.idUser).subscribe( item => {
      this.profile = item
      this.data.changeModelValue(this. profile)
    })
    this.router.navigate(['/form-add'], { state: {type: 'customer'} });
  }

  logOut(){
    this.customerRestService.logout().subscribe(data=>{
      this.router.navigate(['/login']);
    })
  }


}

import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {tableConfig, TableCustomer} from "../../config/table-config/table-customer";
import {Customer} from "../../modules/customer";
import {CustomerService} from "../../services/customer.service";
import {Vehicle} from "../../modules/vehicle";
import {Data, Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {CustomerRESTService} from "../../services/customer-rest.service";

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  role = window.localStorage.getItem('role');
  @Output() actionEvent = new EventEmitter<any>();
  customers: Customer[] = [];
  tablesConfig = tableConfig;

  constructor(private customerService: CustomerService,
              private data: DataService,
              private router: Router,
              private customerRestService: CustomerRESTService) { }

  ngOnInit(): void {
        this.getCustomers();
  }

  getCustomers(): void {
    this.customerRestService.getUserList()
      .subscribe(customers => this.customers = customers);
  }

  getAction(action: any[]) {
    let actionCrud = action[0];
    let customer = action[1];
    switch (actionCrud){
      case 'Delete':
        this.removeCustomer(customer)
        break;
      case 'Update':
        console.log(customer)
        this.data.changeModelValue(customer);
        this.router.navigate(['/form-add'], { state: {type: 'customer'} });
        break;
    }
  }

  removeCustomer(customer: Customer){
    const id = customer.id;
    this.customerRestService.deleteUser(id).subscribe(data => {
      console.log(data)
      this.getCustomers()
    })

  }

}

import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {tableConfig, TableCustomer} from "../../config/table-config/table-customer";
import {Hero} from "../../modules/hero";
import {HeroService} from "../../services/hero.service";
import {Customer} from "../../modules/customer";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  @Output() actionEvent = new EventEmitter<any>();
  heroes: Hero[] = [];
  customers: Customer[] = [];
  tablesConfig = tableConfig;
  all:any;

  constructor(private heroService: HeroService,
              private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getCustomers();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }

  getAction(action: any[]){
    // this.actionEvent.emit(action);
    console.log("FROM ADMIN")
    console.log(action[1].id)

    //insert CRUD Here
    switch (action[0].toLowerCase()){
      case "delete":
        console.log("Ypu are here");
        break;

      case "update":
        break;

    }
  }

}

import { Component, OnInit, Input} from '@angular/core';
import {customerFormCamp, reservationFormCamp, vehicleFormCamp} from "../../config/form-config/customer-form-camp";
import {Location} from "@angular/common";
import {map} from "rxjs/operators";
import {MyFormConfig} from "../../custom-component/custom-form/custom-form.component";
import {VehicleService} from "../../services/vehicle.service";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {CustomerService} from "../../services/customer.service";
import {ReservationService} from "../../services/reservation.service";


@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {

  role = window.localStorage.getItem('role');
  idUser = window.localStorage.getItem('idUser')

  //definire cariabile tipo per
  typeForm = history.state.type;

  customerFormCamp = customerFormCamp;
  vehicleFormCamp = vehicleFormCamp;
  reservationFormCamp = reservationFormCamp;

  model: any = {};

  constructor(private vehicleService: VehicleService,
              private customerService: CustomerService,
              private reservationService: ReservationService,
              private router: Router,
              private data: DataService) { }

  ngOnInit(): void {
    this.data.currentModel.subscribe(model => this.model = model)
  }

  receiveFormCompiled($event){
    this.model = $event;
    switch (this.typeForm){
      case 'vehicle':
        //serviceVehicle
        this.addVehicle();
        this.router.navigateByUrl('/carPark');
        break;
      case 'customer':
        //serviceCustomer
        this.addCustomer();
        this.router.navigateByUrl('/homepage');
        break;
      case 'reservation':
        //Check delle date, torna al form con variabili per i veicoli easy
        this.addReservation();
        this.router.navigateByUrl('/reservations');
    }
  }

  addVehicle(){
    this.vehicleService.addVehicle(this.model).subscribe(response => {
      console.log(response)
    })
  }

  addCustomer(){
    this.customerService.addCustomer(this.model).subscribe(response => {
      console.log(response)
    })
  }

  addReservation(){
    if(this.role == 'customer'){
      this.model.customer = this.idUser;
    }
    this.reservationService.addReservation(this.model).subscribe(response => {
      console.log(response)
    })
  }
}

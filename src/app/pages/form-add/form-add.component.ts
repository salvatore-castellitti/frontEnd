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
import {Vehicle} from "../../modules/vehicle";
import {DatePipe} from "@angular/common";


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
  controlDate: boolean;

  customerFormCamp = customerFormCamp;
  vehicleFormCamp = vehicleFormCamp;
  reservationFormCamp = reservationFormCamp;

  model: any = {};
  vehicles: Vehicle[] = []

  chosenCar: any;
  selectedStartDate
  selectedEndDate
  selectedId

  constructor(private vehicleService: VehicleService,
              private customerService: CustomerService,
              private reservationService: ReservationService,
              private router: Router,
              private data: DataService,
              public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.data.currentModel.subscribe(model => this.model = model);
    this.selectedId = this.model.id;
  }

  receiveFormCompiled($event){
    if ($event != null){
      this.model = $event;
    }

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
        if(this.controlDate){
          console.log(this.selectedEndDate)
          this.addReservation();
          this.router.navigateByUrl('/reservations');

        }else{
          this.checkDate();
        }
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
    this.model.startDate = this.selectedStartDate
    this.model.endDate = this.selectedEndDate

    this.model.vehicle = this.chosenCar

    this.model.id = this.selectedId

    this.reservationService.addReservation(this.model).subscribe(response => {
      console.log(response)
    })
  }

  checkDate(){
    this.controlDate = false
    const formatStartDate = this.model.startDate.replace(/(\d+[/])(\d+[/])/, '$2$1');
    const formatEndDate = this.model.startDate.replace(/(\d+[/])(\d+[/])/, '$2$1');
    const startDate = new Date(formatStartDate)
    const endDate = new Date(formatEndDate)
    this.selectedStartDate = this.model.startDate
    this.selectedEndDate = this.model.endDate
    if(startDate <= endDate){
      this.controlDate = true
      this.getVehicles();
      this.router.navigate(['/form-add']);
    }
  }

  getVehicles(): void {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }
}

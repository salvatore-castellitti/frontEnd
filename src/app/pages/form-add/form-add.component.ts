import { Component, OnInit, Input} from '@angular/core';
import {customerFormCamp, reservationFormCamp, vehicleFormCamp} from "../../config/form-config/customer-form-camp";
import {VehicleService} from "../../services/vehicle.service";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {CustomerService} from "../../services/customer.service";
import {ReservationService} from "../../services/reservation.service";
import {Vehicle} from "../../modules/vehicle";
import {DatePipe} from "@angular/common";
import {CustomerRESTService} from "../../services/customer-rest.service";
import {VehicleRESTService} from "../../services/vehicle-rest.service";
import {ReservationRESTService} from "../../services/reservation-rest.service";
import {forkJoin} from "rxjs";


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

  chosenCar
  selectedStartDate
  selectedEndDate
  selectedId
  finalUser
  finalVehicle

  constructor(private vehicleService: VehicleService,
              private customerService: CustomerService,
              private reservationService: ReservationService,
              private router: Router,
              private data: DataService,
              public datePipe: DatePipe,
              private customerRestService: CustomerRESTService,
              private vehicleRestService: VehicleRESTService,
              private reservationRestService: ReservationRESTService) { }

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
        break;
      case 'customer':
        //serviceCustomer
        this.addCustomer();
        break;
      case 'reservation':
        //Check delle date, torna al form con variabili per i veicoli easy
        if(this.controlDate){
          console.log(this.selectedEndDate)
          this.addReservation();

        }else{
          this.checkDate();
        }
    }
  }

  // addVehicle(){
  //   this.vehicleService.addVehicle(this.model).subscribe(response => {
  //     console.log(response)
  //   })
  // }
  addVehicle(){
    this.vehicleRestService.createVehicle(this.model).subscribe(response => {
      console.log(response)
      this.router.navigateByUrl('/carPark');

    })
  }

  // addCustomer(){
  //   this.customerService.addCustomer(this.model).subscribe(response => {
  //     console.log(response)
  //   })
  // }
  addCustomer(){
    this.customerRestService.createUser(this.model).subscribe(response => {
      console.log(response)
      this.router.navigateByUrl('/homepage');
    })
  }

  addReservation(){

    forkJoin(
      this.customerRestService.getUserById(+this.idUser),
      this.vehicleRestService.getVehicleById(+this.chosenCar)
    ).subscribe((resps: Array<any>) => {
      this.model.user = resps[0];
      this.model.vehicle = resps[1];
      this.model.id = this.selectedId
      this.model.startDate = this.selectedStartDate
      this.model.endDate = this.selectedEndDate
      this.reservationRestService.createReservation(this.model).subscribe(response => {
        console.log(response)
        this.router.navigateByUrl('/reservations');

      })
    })





  }

  checkDate(){
    this.controlDate = false
    const formatStartDate = this.model.startDate.replace(/(\d+[/])(\d+[/])/, '$2$1');
    const formatEndDate = this.model.endDate.replace(/(\d+[/])(\d+[/])/, '$2$1');
    const startDate = new Date(formatStartDate)
    const endDate = new Date(formatEndDate)
    const currentDate = new Date()
    this.selectedStartDate = this.model.startDate
    this.selectedEndDate = this.model.endDate
    if(startDate <= endDate && startDate >= currentDate && endDate>=currentDate){
      this.controlDate = true
      this.getVehicles(startDate, endDate);
      this.router.navigate(['/form-add']);
    }
  }

  getVehicles(sDate, eDate): void {
    this.vehicleRestService.getFreeVehicles(sDate, eDate)
      .subscribe(vehicles => this.vehicles = vehicles);
  }
}

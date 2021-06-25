import { Component, OnInit} from '@angular/core';
import {
  customerFormCamp,
  customerRegisterCamo,
  reservationFormCamp,
  vehicleFormCamp
} from "../../config/form-config/customer-form-camp";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {Vehicle} from "../../modules/vehicle";
import {CustomerRESTService} from "../../services/customer-rest.service";
import {VehicleRESTService} from "../../services/vehicle-rest.service";
import {ReservationRESTService} from "../../services/reservation-rest.service";
import {forkJoin} from "rxjs";
import {Customer} from "../../modules/customer";


@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {

  role = window.localStorage.getItem('role');
  idUser = window.localStorage.getItem('idUser')

  typeForm = history.state.type;
  controlDate: boolean;
  err: string;

  customerFormCamp = customerFormCamp;
  customerRegisterCamp = customerRegisterCamo;
  vehicleFormCamp = vehicleFormCamp;
  reservationFormCamp = reservationFormCamp;

  model: any = {};
  vehicles: Vehicle[] = []

  chosenCar
  selectedStartDate
  selectedEndDate
  selectedId

  customer: Customer = new Customer();


  constructor(private router: Router,
              private data: DataService,
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
        this.addVehicle();
        break;
      case 'customer':
        this.addCustomer();
        break;
      case 'reservation':
        if(this.controlDate){
          this.addReservation();
        }else{
          this.checkDate();
        }
        break;
      case 'customer-register':
        this.registerCustomer()
        break;
    }
  }
  addVehicle(){
    if (this.model.houseProducer != null && this.model.model != null && this.model.type != null && this.model.licensePlate != null ){
      this.vehicleRestService.createVehicle(this.model).subscribe(response => {
        console.log(response)
        this.router.navigateByUrl('/carPark');
      })
      }else{
        this.err = 'Sorry, Can\'t crate this vehicle'
      this.router.navigate(['form-add'])
      }


  }

  addCustomer(){
    if(this.model.username != ""){
      this.customerRestService.updateUser(this.model).subscribe(response => {
        console.log(response)
        if(this.role=="ADMIN"){
          this.router.navigateByUrl('/homepage');
        }else{
          this.router.navigateByUrl('/homepage-customer');
        }
      })
    }else{
      this.err = 'Sorry you can\'t delete your Username'
      this.router.navigate(['form-add'])
    }
  }

  registerCustomer(){
    if (this.model.username != null && this.model.password != null){
      this.customer = this.model
      console.log(this.customer)
      this.customerRestService.createUser(this.customer).subscribe(response =>{
        console.log(response)
        this.router.navigateByUrl('/homepage');
      })
    }else{
      this.err = 'Sorry incorrect username or password'
      this.router.navigate(['/form-add']);
    }
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
      this.model.approved = false
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

    if(startDate <= endDate && startDate >= currentDate && endDate>=currentDate || this.model.startDate != null || this.model.endDate != null){
      this.err=null
      this.controlDate = true
      this.getVehicles(startDate, endDate);
      this.router.navigate(['/form-add']);
    }else{
      this.err = 'Sorry, invalid Date, also be sure to check the correct format, if the problem persist contact the Support'
    }
  }

  getVehicles(sDate, eDate): void {
    this.vehicleRestService.getFreeVehicles(sDate, eDate)
      .subscribe(vehicles => {
        this.vehicles = vehicles})
  }
}

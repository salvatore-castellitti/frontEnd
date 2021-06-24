import { Component, OnInit } from '@angular/core';
import {tableConfig_Reservation} from "../../config/table-config/table-reservation-admin";
import {Reservation} from "../../modules/reservation";
import {tableConfig_Reservation_Customer} from "../../config/table-config/table-reservation-customer";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {ReservationRESTService} from "../../services/reservation-rest.service";
import {CustomerRESTService} from "../../services/customer-rest.service";
import {Customer} from "../../modules/customer";
import * as _ from 'lodash';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  role = window.localStorage.getItem('role');
  idUser = window.localStorage.getItem('idUser');
  tableConfig = tableConfig_Reservation;
  tableConfig_Customer = tableConfig_Reservation_Customer
  loggedUser
  err


  reservations: Reservation[] = [];

  constructor(private data: DataService,
              private router: Router,
              private reservationRestService: ReservationRESTService,
              private customerRESTService: CustomerRESTService) {}

  ngOnInit(): void {
    if(this.role == 'ADMIN'){
      this.getReservations()
    }else if(this.role == 'CUSTOMER'){
      this.customerRESTService.getUserById(+this.idUser).subscribe(data => {
        this.loggedUser = data
        this.getReservationCurrentUSer(this.loggedUser)
      })
    }
  }

  getAction(action: any[]) {
    let actionCrud = action[0];
    let reservation = action[1];
    console.log(reservation)
    switch (actionCrud){
      case 'Delete':
        this.removeReservation(reservation)
        break;
      case 'Update':
        this.data.changeModelValue(reservation);
        this.router.navigate(['/form-add'], { state: {type: 'reservation'} });
        break;
    }
  }

  getReservations(): void{
    this.reservationRestService.getReservationList()
      .subscribe(reservations => {
        reservations.forEach(function (value){
          value.user = _.get(value, 'user.username')
          value.vehicle = _.get(value, 'vehicle.houseProducer').concat(' ').concat(_.get(value, 'vehicle.model'))
        })
        this.reservations = reservations
      })

  }

  getReservationCurrentUSer(user: Customer): void{
    this.reservationRestService.getReservationsCurrent(user)
      .subscribe(reservations => {
        this.reservations = reservations
        reservations.forEach(function (value){
          value.vehicle = _.get(value, 'vehicle.houseProducer').concat(' ').concat(_.get(value, 'vehicle.model'))
        })
      })

  }

  removeReservation(reservation: Reservation){
    const id = reservation.id;
    this.reservationRestService.getReservationById(id).subscribe(reservation =>
      {
        if(this.checkDateTime(reservation.startDate)){
          this.reservationRestService.deleteReservation(id).subscribe(res => {
            if(this.role == 'ADMIN'){
              this.getReservations()
            }else if(this.role == 'CUSTOMER'){
              this.getReservationCurrentUSer(this.loggedUser)
            }
          })
        }else{
          this.router.navigate(['/reservations'])
        }
      }
    )
  }

  checkDateTime(sDate){
    const formatStartDate = sDate.replace(/(\d+[/])(\d+[/])/, '$2$1');
    const startDate = new Date(formatStartDate)
    const currentDate = new Date()

    if(((+startDate.getTime() - +currentDate.getTime())/(1000*60*60*24)) <2){
      this.err= 'Sorry, You can\'t delete this Reservation, contact an admin';
      return false
    }else{
      return true;
    }




  }
}

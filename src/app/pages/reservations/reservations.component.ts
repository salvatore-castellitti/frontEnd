import { Component, OnInit } from '@angular/core';
import {tableConfig_Reservation} from "../../config/table-config/table-reservation-admin";
import {ReservationService} from "../../services/reservation.service";
import {Reservation} from "../../modules/reservation";
import {tableConfig_Reservation_Customer} from "../../config/table-config/table-reservation-customer";
import {Vehicle} from "../../modules/vehicle";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {ReservationRESTService} from "../../services/reservation-rest.service";
import {CustomerRESTService} from "../../services/customer-rest.service";
import {Customer} from "../../modules/customer";

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

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService,
              private data: DataService,
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

  // getReservations(): void{
  //   this.reservationService.getReservations()
  //     .subscribe(reservations => this.reservations = reservations)
  // }
  getReservations(): void{
    this.reservationRestService.getReservationList()
      .subscribe(reservations => {
        this.reservations = reservations,
          console.log(this.reservations)
      })

  }

  getReservationCurrentUSer(user: Customer): void{
    this.reservationRestService.getReservationsCurrent(user)
      .subscribe(reservations => {this.reservations = reservations})

  }

  removeReservation(reservation: Reservation){
    const id = reservation.id;
    this.reservationRestService.deleteReservation(id).subscribe(reservation => console.log(reservation))
    if(this.role == 'ADMIN'){
      this.getReservations()
    }else if(this.role == 'CUSTOMER'){
      this.getReservationCurrentUSer(this.loggedUser)
    }
  }

}

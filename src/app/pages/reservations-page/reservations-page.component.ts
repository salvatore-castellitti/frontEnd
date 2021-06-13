import { Component, OnInit } from '@angular/core';
import {tableConfig_Reservation} from "../../config/table-config/table-reservation";

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css']
})
export class ReservationsPageComponent implements OnInit {
  tableConfig = tableConfig_Reservation;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {tableConfig_Vehicle} from "../../config/table-config/table-vehicles-admin";
import {tableConfig_Vehicle_Customer} from "../../config/table-config/table-vehicles-customer";
import {Vehicle} from "../../modules/vehicle";
import {VehicleService} from "../../services/vehicle.service";

@Component({
  selector: 'app-car-park',
  templateUrl: './car-park.component.html',
  styleUrls: ['./car-park.component.css']
})
export class CarParkComponent implements OnInit {
  role = 'customer';
  tableComponent_admin = tableConfig_Vehicle;
  tableComponent_customer = tableConfig_Vehicle_Customer;
  vehicles: Vehicle[] = [];
  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles()
  }

  getVehicles(): void {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }

}

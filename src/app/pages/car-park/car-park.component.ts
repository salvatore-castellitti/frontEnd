import { Component, OnInit } from '@angular/core';
import {tableConfig_Vehicle} from "../../config/table-config/table-vehicles-admin";
import {tableConfig_Vehicle_Customer} from "../../config/table-config/table-vehicles-customer";
import {Vehicle} from "../../modules/vehicle";
import {VehicleService} from "../../services/vehicle.service";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-car-park',
  templateUrl: './car-park.component.html',
  styleUrls: ['./car-park.component.css']
})
export class CarParkComponent implements OnInit {
  role = window.localStorage.getItem('role');
  tableComponent_admin = tableConfig_Vehicle;
  tableComponent_customer = tableConfig_Vehicle_Customer;
  vehicles: Vehicle[] = [];

  model:any = {}


  constructor(private vehicleService: VehicleService,
              private router: Router,
              private data : DataService) { }

  ngOnInit(): void {
    this.getVehicles();
    this.data.currentModel.subscribe(model => this.model = model)

  }

  getVehicles(): void {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  getAction(action: any[]) {
    let actionCrud = action[0];
    let vehicle = action[1];
    switch (actionCrud){
      case 'Delete':
        this.removeVehicle(vehicle)
        break;
      case 'Update':
        this.data.changeModelValue(vehicle);
        this.router.navigate(['/form-add'], { state: {type: 'vehicle'} });
        break;
      case 'Book':
        this.router.navigate(['/form-add'], { state: {type: 'reservation'} });
    }
  }

  removeVehicle(vehicle: Vehicle){
    const id = vehicle.id;
    this.vehicleService.deleteVehicle(id).subscribe(vehicle => console.log(vehicle))
    this.getVehicles()
  }


}

import {Vehicle} from "./vehicle";
import {Customer} from "./customer";

export interface Reservation{
  id: number,
  customer: Customer,
  startDate:string,
  endDate: string,
  vehicle: Vehicle,
}

import {Vehicle} from "./vehicle";
import {Customer} from "./customer";

export interface Reservation{
  id: number,
  user: Customer,
  startDate:string,
  endDate: string,
  vehicle: Vehicle,
}

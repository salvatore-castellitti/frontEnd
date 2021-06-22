import {Role} from "./role";

export class Customer{
  id: number;
  firstName: string;
  lastName:string;
  username: string = "";
  password: string = "";
  token?: string;
  role: Role;
}

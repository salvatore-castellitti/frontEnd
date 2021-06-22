import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SalutiDataService {

  constructor(private http: HttpClient) { }

  getSaluti(nome){
    return this.http.get(`http://localhost:8050/api/saluti/${nome}`)
  }
}

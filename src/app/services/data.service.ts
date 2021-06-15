import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private model = new BehaviorSubject<any>({id: undefined});
  currentModel = this.model.asObservable();

  constructor() { }

  changeModelValue(model: any){
    this.model.next(model)
  }
}



import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const customers = [
      { id: 11, name: 'Dr Nice', surname:'capo' },
      { id: 12, name: 'Narco', surname:'capo' },
      { id: 13, name: 'Bombasto', surname:'capo' },
      { id: 14, name: 'Celeritas', surname: 'pacino' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    const vehicles = [
      { id: 1, type: 'Car', model:'Model 3', houseProducer:'Tesla', licensePlate:'AA667AA' },
      { id: 2, type: 'Electric', model:'Y', houseProducer:'Lancia', licensePlate:'BB888BB' },
      { id: 3, type: 'Sport', model:'Aventador', houseProducer:'Lamborghini', licensePlate:'CC999CC' },
    ];

    const reservations = [
      { id: 1, customer: '13', startDate:'26/05/2020', endDate:'27/06/2020', vehicle:'1' },
      { id: 2, customer: '13', startDate:'26/05/2020', endDate:'28/06/2020', vehicle:'2' },
      { id: 3, customer: '3', startDate:'26/05/2020', endDate:'29/06/2020', vehicle:'3' },
    ]
    return {customers, vehicles, reservations};
  }
  // columns: ["id", "customer", "startDate", "endDate", "vehicle"]

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  // genId(heroes: Hero[]): number {
  //   return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  // }
}

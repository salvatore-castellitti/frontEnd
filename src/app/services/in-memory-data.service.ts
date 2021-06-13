import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../modules/hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
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
      { id: 1, type: 'Car', model:'Model 3', houseProducer:'Tesla', taxCode:'AA667AA' },
      { id: 2, type: 'Electric', model:'Y', houseProducer:'Lancia', taxCode:'BB888BB' },
      { id: 3, type: 'Sport', model:'Aventador', houseProducer:'Lamborghini', taxCode:'CC999CC' },
    ];
    return {heroes, customers, vehicles};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConceirgeServicesService {
  conceirgeServices: any = [];
  constructor() {
    this.conceirgeServices = [
      {
        id: 1,
        name: 'Conceirge Services',
        description: 'Conceirge Services'
      }
    ]
   }

  getConceirgeServices() {
    return this.conceirgeServices;
  }
}

import { Component } from '@angular/core';
import { Host } from 'src/app/models/host.model';

const ELEMENT_DATA: Host[] = [
  {id: 1, name: 'Amar Patil', location: 'Anjuna, North Goa',  status: 1,  noOfVillas: 5, typeOfPlace: 'Villa', aminities: '', ratings: '4+', mealType: 'Veg, Non-Veg'},
  {id: 2, name: 'Manish Kumar', location: 'Anjuna, North Goa',  status: 1,  noOfVillas: 4, typeOfPlace: 'Villa', aminities: '', ratings: '4+', mealType: 'Veg, Non-Veg'},
  {id: 3, name: 'Vijay', location: 'Anjuna, North Goa',  status: 1,  noOfVillas: 3, typeOfPlace: 'Villa', aminities: '', ratings: '3+', mealType: 'Veg, Non-Veg'},
  {id: 4, name: 'Yogesh', location: 'Anjuna, North Goa',  status: 1, noOfVillas: 5, typeOfPlace: 'Villa', aminities: '', ratings: '5+', mealType: 'Veg, Non-Veg'},
  {id: 5, name: 'Rahul', location: 'Anjuna, North Goa',  status: 1, noOfVillas: 5, typeOfPlace: 'Villa', aminities: '', ratings: '2+', mealType: 'Veg, Non-Veg'},
  
];
@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent {
  displayedColumns: string[] = ['id', 'name', 'location', 'status',  'noOfVillas', 'typeOfPlace', 'rating', 'mealType','options'];
  dataSource = ELEMENT_DATA;
}

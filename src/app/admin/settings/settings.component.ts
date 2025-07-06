import { Component } from '@angular/core';
import { Booking } from 'src/app/models/bookings.model';

const ELEMENT_DATA: Booking[] = [
  {id: 1, customerName: 'Amar Patil', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 5, price: 149000, aminities: '', mealType: 'Veg, Non-Veg', status: 'Confirmed', date: '25-May-2023'},
  {id: 2, customerName: 'Manish Kumar', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 4, price: 129000, aminities: '', mealType: 'Veg, Non-Veg',status: 'Confirmed', date: '25-May-2023'},
  {id: 3, customerName: 'Vijay', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 3, price: 139000, aminities: '', mealType: 'Veg, Non-Veg',status: 'Booked', date: '30-May-2023'},
  {id: 4, customerName: 'Yogesh', villaName: 'Pura Vida', location: 'Anjuna, North Goa',   noOfVillas: 5, price: 99000, aminities: '', mealType: 'Veg, Non-Veg',status: 'Waiting', date: '25-May-2023'},
  {id: 5, customerName: 'Rahul', villaName: 'Pura Vida', location: 'Anjuna, North Goa',   noOfVillas: 5, price: 89000, aminities: '',  mealType: 'Veg, Non-Veg',status: 'Cancelled', date: '27-May-2023'},
  
];
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  displayedColumns: string[] = ['id', 'customerName', 'villaName', 'location', 'price',  'noOfVillas', 'mealType', 'date', 'status', 'options'];
  dataSource = ELEMENT_DATA;
}

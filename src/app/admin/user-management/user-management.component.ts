import { Component } from '@angular/core';
import { Booking } from 'src/app/models/bookings.model';

const ELEMENT_DATA: any[] = [
  {id: 1, email:"a.p.patil@gmail.com",conceirg:"Airport pickup and drop",phone:"1234567890",customerName: 'Amar Patil', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 5, price: 149000, aminities: '', mealType: 'Included', status: 'Reserved', date: '25-May-2023'},
  {id: 2, email:"a.p.patil@gmail.com",conceirg:"Airport pickup and drop",phone:"1234567890",customerName: 'Manish Kumar', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 4, price: 129000, aminities: '', mealType: 'Included',status: 'Reserved', date: '25-May-2023'},
  {id: 3, email:"a.p.patil@gmail.com",conceirg:"Airport pickup and drop",phone:"1234567890",customerName: 'Vijay', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 3, price: 139000, aminities: '', mealType: 'Included',status: 'Cancelled', date: '30-May-2023'},
  {id: 4, email:"a.p.patil@gmail.com",conceirg:"Airport pickup and drop",phone:"1234567890",customerName: 'Yogesh', villaName: 'Pura Vida', location: 'Anjuna, North Goa',   noOfVillas: 5, price: 99000, aminities: '', mealType: 'Included',status: 'Waiting', date: '25-May-2023'},
  {id: 5, email:"a.p.patil@gmail.com",conceirg:"Airport pickup and drop",phone:"1234567890",customerName: 'Rahul', villaName: 'Pura Vida', location: 'Anjuna, North Goa',   noOfVillas: 5, price: 89000, aminities: '',  mealType: 'Included',status: 'Cancelled', date: '27-May-2023'},
  
];

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  displayedColumns: string[] = ['customerName','email','phone', 'date','villaName','mealType','conceirg',  'status'];
  displayedColumns1: string[] = ['customerName','email','phone', 'date','villaName','mealType','conceirg'];
  displayedColumns2: string[] = ['customerName','email','phone'];
  dataSource = ELEMENT_DATA;
  index = 0


  tabSelected(index:any){
    this.index =  index
  }
}

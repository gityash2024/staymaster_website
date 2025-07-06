import { Component } from '@angular/core';
import { Booking } from 'src/app/models/bookings.model';

const ELEMENT_DATA: any[] = [
  {id: 1, email:'a.p.patil@gmail.com',purpose:"want to get",message:"swimming pool in the villa",phone:'1234567898',customerName: 'Amar Patil', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 5, price: '1-2 Cr', aminities: 'Beach Front', mealType: 'Veg, Non-Veg', status: 'Confirmed', date: '25-May-2023'},
  {id: 2, email:'a.p.patil@gmail.com',purpose:"want to get",message:"swimming pool in the villa",phone:'1234567898',customerName: 'Manish Kumar', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 4, price: '1-2 Cr', aminities: 'Beach Front', mealType: 'Veg, Non-Veg',status: 'Confirmed', date: '25-May-2023'},
  {id: 3, email:'a.p.patil@gmail.com',purpose:"want to get",message:"swimming pool in the villa",phone:'1234567898',customerName: 'Vijay', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 3, price: '1-2 Cr', aminities: 'Beach Front', mealType: 'Veg, Non-Veg',status: 'Booked', date: '30-May-2023'},
  {id: 4, email:'a.p.patil@gmail.com',purpose:"want to get",message:"swimming pool in the villa",phone:'1234567898',customerName: 'Yogesh', villaName: 'Pura Vida', location: 'Anjuna, North Goa',   noOfVillas: 5, price: '1-2 Cr', aminities: 'Beach Front', mealType: 'Veg, Non-Veg',status: 'Waiting', date: '25-May-2023'},
  {id: 5, email:'a.p.patil@gmail.com',purpose:"want to get",message:"swimming pool in the villa",phone:'1234567898',customerName: 'Rahul', villaName: 'Pura Vida', location: 'Anjuna, North Goa',   noOfVillas: 5, price: '1-2 Cr', aminities: 'Beach Front',  mealType: 'Veg, Non-Veg',status: 'Cancelled', date: '27-May-2023'},
  
];
@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent {
  displayedColumns: string[] = ['customerName','email','phone','purpose','message','options'];
  displayedColumns1: string[] = ['customerName','email','phone','villaName','options'];
  displayedColumns2: string[] = ['email','phone','location','price','villaName','aminities','options'];
  dataSource = ELEMENT_DATA;
  index = 0


  tabSelected(index:any){
    this.index =  index
  }
}

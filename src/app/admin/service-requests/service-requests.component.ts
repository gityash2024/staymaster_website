import { Component } from '@angular/core';
import { Booking } from 'src/app/models/bookings.model';
import { ModalManagerService } from 'src/app/services/modal-manager.service';

const ELEMENT_DATA: Booking[] = [
  {id: 1, customerName: 'Amar Patil', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 5, price: 149000, aminities: '', mealType: 'Veg, Non-Veg', status: 'Confirmed', date: '25-May-2023'},
  {id: 2, customerName: 'Manish Kumar', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 4, price: 129000, aminities: '', mealType: 'Veg, Non-Veg',status: 'Confirmed', date: '25-May-2023'},
  {id: 3, customerName: 'Vijay', villaName: 'Pura Vida', location: 'Anjuna, North Goa',    noOfVillas: 3, price: 139000, aminities: '', mealType: 'Veg, Non-Veg',status: 'Booked', date: '30-May-2023'},
  {id: 4, customerName: 'Yogesh', villaName: 'Pura Vida', location: 'Anjuna, North Goa',   noOfVillas: 5, price: 99000, aminities: '', mealType: 'Veg, Non-Veg',status: 'Waiting', date: '25-May-2023'},
  {id: 5, customerName: 'Rahul', villaName: 'Pura Vida', location: 'Anjuna, North Goa',   noOfVillas: 5, price: 89000, aminities: '',  mealType: 'Veg, Non-Veg',status: 'Cancelled', date: '27-May-2023'},
  
];
@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.scss']
})
export class ServiceRequestsComponent {
  displayedColumns: string[] = ['id', 'customerName', 'villaName', 'location', 'price',  'noOfVillas', 'mealType', 'date', 'status', 'options'];
  dataSource = ELEMENT_DATA;

  index = 0

  constructor( private mms: ModalManagerService){}

  tabSelected(index:any){
    this.index =  index
  }

  
  openModal(){
    const dialogRef = this.mms.openViewServiceRequestModal({id: 0}).subscribe((res: any) => {      
  
  // res.id = ELEMENT_DATA?.length+1;
  // ELEMENT_DATA.push(res);
  // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  // this.dataSource.paginator = this.paginator;
  // this.table.renderRows();
});
}
}

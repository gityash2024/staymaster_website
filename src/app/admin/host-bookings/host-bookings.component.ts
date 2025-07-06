import { Component } from '@angular/core';
import { Host } from 'src/app/models/host.model';
import { ModalManagerService } from 'src/app/services/modal-manager.service';

const ELEMENT_DATA: Host[] = [
  {id: 1, name: 'Amar Patil', location: 'Anjuna, North Goa',  status: 1,  noOfVillas: 5, typeOfPlace: 'Villa', aminities: '', ratings: '4+', mealType: 'Veg, Non-Veg'},
  {id: 2, name: 'Manish Kumar', location: 'Anjuna, North Goa',  status: 1,  noOfVillas: 4, typeOfPlace: 'Villa', aminities: '', ratings: '4+', mealType: 'Veg, Non-Veg'},
  {id: 3, name: 'Vijay', location: 'Anjuna, North Goa',  status: 1,  noOfVillas: 3, typeOfPlace: 'Villa', aminities: '', ratings: '3+', mealType: 'Veg, Non-Veg'},
  {id: 4, name: 'Yogesh', location: 'Anjuna, North Goa',  status: 1, noOfVillas: 5, typeOfPlace: 'Villa', aminities: '', ratings: '5+', mealType: 'Veg, Non-Veg'},
  {id: 5, name: 'Rahul', location: 'Anjuna, North Goa',  status: 1, noOfVillas: 5, typeOfPlace: 'Villa', aminities: '', ratings: '2+', mealType: 'Veg, Non-Veg'},
  
];
@Component({
  selector: 'app-host-bookings',
  templateUrl: './host-bookings.component.html',
  styleUrls: ['./host-bookings.component.scss']
})
export class HostBookingsComponent {

  constructor(
    private mms: ModalManagerService
  ){}

  displayedColumns: string[] = ['id', 'name', 'location', 'status',  'noOfVillas', 'typeOfPlace', 'rating', 'mealType','options'];
  dataSource = ELEMENT_DATA;


  openModal(){
        const dialogRef = this.mms.openDeclineHostModal({id: 0}).subscribe((res: any) => {      
      
      // res.id = ELEMENT_DATA?.length+1;
      // ELEMENT_DATA.push(res);
      // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      // this.dataSource.paginator = this.paginator;
      // this.table.renderRows();
    });
  }
}

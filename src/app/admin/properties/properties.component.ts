import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Properties } from 'src/app/models/properties.model';
import { AdminService } from 'src/app/services/admin.service';
import { ModalManagerService } from 'src/app/services/modal-manager.service';

const ELEMENT_DATA: Properties[] = [
  {id: 1, name: 'Pura Vida', location: 'Anjuna, North Goa',  price: 149000, daynight: 'Night', bedrooms: 5, typeOfPlace: 'Villa', aminities: '', ratings: '4+', mealType: 'Veg, Non-Veg'},
  {id: 2, name: 'Pura Vida', location: 'Anjuna, North Goa',  price: 129000, daynight: 'Night', bedrooms: 4, typeOfPlace: 'Villa', aminities: '', ratings: '4+', mealType: 'Veg, Non-Veg'},
  {id: 3, name: 'Pura Vida', location: 'Anjuna, North Goa',  price: 249000, daynight: 'Night', bedrooms: 10, typeOfPlace: 'Apartment', aminities: '', ratings: '3+', mealType: 'Veg, Non-Veg'},
  {id: 4, name: 'Pura Vida', location: 'Anjuna, North Goa',  price: 149000, daynight: 'Night', bedrooms: 5, typeOfPlace: 'Villa', aminities: '', ratings: '5+', mealType: 'Veg, Non-Veg'},
  {id: 5, name: 'Pura Vida', location: 'Anjuna, North Goa',  price: 149000, daynight: 'Night', bedrooms: 5, typeOfPlace: 'Villa', aminities: '', ratings: '2+', mealType: 'Veg, Non-Veg'},
  
];

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {
  
  displayedColumns: string[] = ['id', 'name', 'location', 'price', 'daynight', 'bedrooms', 'typeOfPlace', 'rating', 'mealType','options'];
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as any;
  constructor(
    private mms: ModalManagerService,
    private adminService: AdminService
    ) {
      this.dataSource = ELEMENT_DATA;
  }

  ngOnInit(): void {
    this.login();
    setTimeout(() => {
      this.loadMasterData();
    }, 300);
  }

  addNewProperty(){
    // const dialogRef = this.mms.openAddNewPropertyModel({id: 0}).subscribe((res: any) => {      
      
    //   res.id = ELEMENT_DATA?.length+1;
    //   ELEMENT_DATA.push(res);
    //   this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    //   this.dataSource.paginator = this.paginator;
    //   // this.table.renderRows();
    // });   
    
  }

  login() {
    let data = {
      email: 'x@y.com',
      password: 'abcd1234'
    };
    this.adminService.userLogin(data).subscribe((res: any) => { 

    });
  }

  loadMasterData() {
    
    this.adminService.getProperties().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
    })
  };
}

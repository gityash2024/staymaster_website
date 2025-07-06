import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Aminities } from 'src/app/models/aminitie.model';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import { MatPaginator } from '@angular/material/paginator';


const ELEMENT_DATA: Aminities[] = [
  {id: 1, name: 'Wifi' },
  {id: 3, name: 'AC' },
  {id: 4, name: 'Kitchen' },
  {id: 5, name: 'Dryer' },
  {id: 6, name: 'Washing Machine' },
  {id: 7, name: 'Iron' },
  {id: 8, name: 'Pool' },
  {id: 9, name: 'Parking' },
  {id: 10, name: 'Gardan' }
];
@Component({
  selector: 'app-aminities',
  templateUrl: './aminities.component.html',
  styleUrls: ['./aminities.component.scss']
})
export class AminitiesComponent {
  table: any;
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as any;
  constructor(
    private mms: ModalManagerService
    ) {
      this.dataSource = ELEMENT_DATA;
  }
  displayedColumns: string[] = ['id', 'name', 'options'];
  
  // @ViewChild(MatTable) table: MatTable<Aminities>;
  

  addAminities(){
    const dialogRef = this.mms.openAddAminitiesModel({id: 0}).subscribe((res: any) => {      
      let data = {
        id: ELEMENT_DATA?.length+1,
        name: res.name
      }
      ELEMENT_DATA.push(data);
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      // this.table.renderRows();
    });
    
  }
}

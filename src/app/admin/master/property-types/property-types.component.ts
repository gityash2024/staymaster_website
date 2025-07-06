import { Component } from '@angular/core';
import { PropertyType } from 'src/app/models/propertyTypes.model';

const ELEMENT_DATA: PropertyType[] = [
  {id: 1, propertyType: 'Villa' },
  {id: 2, propertyType: 'Apartment' }
];
@Component({
  selector: 'app-property-types',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.scss']
})
export class PropertyTypesComponent {
  displayedColumns: string[] = ['id', 'propertyType', 'options'];
  dataSource = ELEMENT_DATA;
}

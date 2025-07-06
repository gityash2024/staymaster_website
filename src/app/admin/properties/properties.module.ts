import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesComponent } from './properties.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddNewPropertyComponent } from './add-new-property/add-new-property.component';
import { PropertyTypesComponent } from './property-types/property-types.component';
import { AddNewPropComponent } from './add-new-prop/add-new-prop.component';
import { ViewPropertyComponent } from './view-property/view-property.component';



@NgModule({
  declarations: [
    PropertiesComponent,
    AddNewPropertyComponent,
    PropertyTypesComponent,
    AddNewPropComponent,
    ViewPropertyComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    SharedModule
  ]
})
export class PropertiesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AminitiesRoutingModule } from './aminities-routing.module';
import { AminitiesComponent } from './aminities.component';
import { AddAminitieComponent } from './add-aminitie/add-aminitie.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AminitiesComponent,
    AddAminitieComponent
  ],
  imports: [
    CommonModule,
    AminitiesRoutingModule,
    SharedModule
  ]
})
export class AminitiesModule { }

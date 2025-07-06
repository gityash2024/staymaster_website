import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RatesAndInventoryRoutingModule } from './rates-and-inventory-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RatesAndInventoryComponent } from './rates-and-inventory.component';



@NgModule({
  declarations: [
    RatesAndInventoryComponent
  ],
  imports: [
    CommonModule,
    RatesAndInventoryRoutingModule,
    SharedModule
  ]
})
export class RatesAndInventoryModule { 

data = [
  {Date:'11-01-2022',
    DayOfWeek:"SUN",
  }
]


}

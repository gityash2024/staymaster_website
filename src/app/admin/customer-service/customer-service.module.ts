import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  CustomerServiceRoutingModule } from './customer-service-routing.module';
import { CustomerServiceComponent } from './customer-service.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CustomerServiceComponent
  ],
  imports: [
    CommonModule,
    CustomerServiceRoutingModule,
    SharedModule
  ]
})
export class CustomerServiceModule { }

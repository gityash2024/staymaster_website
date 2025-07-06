import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HostBookingsRoutingModule } from './host-bookings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HostBookingsComponent } from './host-bookings.component';
import { DeclineHostComponent } from './decline-host/decline-host.component';



@NgModule({
  declarations: [
    HostBookingsComponent,
    DeclineHostComponent
  ],
  imports: [
    CommonModule,
    HostBookingsRoutingModule,
    SharedModule
  ]
})
export class HostBookingsModule { }

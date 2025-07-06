import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingsComponent } from './bookings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewBookingComponent } from './view-booking/view-booking.component';



@NgModule({
  declarations: [
    BookingsComponent,
    ViewBookingComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule
  ]
})
export class BookingsModule { }

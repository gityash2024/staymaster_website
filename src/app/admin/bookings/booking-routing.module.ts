import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { BookingsComponent } from "./bookings.component";
import { ViewBookingComponent } from "./view-booking/view-booking.component";

const routes: Routes = [
    {
        path: '',
        component: BookingsComponent
    },
    {
        path: 'vb',
        component: ViewBookingComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BookingRoutingModule { }
  
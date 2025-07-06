import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HostBookingsComponent } from "./host-bookings.component";

const routes: Routes = [
    {
        path: '',
        component: HostBookingsComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HostBookingsRoutingModule { }
  
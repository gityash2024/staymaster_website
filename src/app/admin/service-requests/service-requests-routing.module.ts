import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {  ServiceRequestsComponent } from "./service-requests.component";
import { NewServiceRequestComponent } from "./new-service-request/new-service-request.component";

const routes: Routes = [
    {
        path: '',
        component: ServiceRequestsComponent
    },
    {
        path: 'nsr',
        component: NewServiceRequestComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ServiceRequestsRoutingModule { }
  
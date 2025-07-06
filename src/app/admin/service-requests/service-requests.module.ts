import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ServiceRequestsRoutingModule } from './service-requests-routing.module';
import { ServiceRequestsComponent } from './service-requests.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewServiceRequestComponent } from './new-service-request/new-service-request.component';
import { ViewServiceRequestComponent } from './view-service-request/view-service-request.component';



@NgModule({
  declarations: [
    ServiceRequestsComponent,
    NewServiceRequestComponent,
    ViewServiceRequestComponent
  ],
  imports: [
    CommonModule,
    ServiceRequestsRoutingModule,
    SharedModule
  ]
})
export class ServiceRequestsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementComponent } from './user-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { ViewUserComponent } from './view-user/view-user.component';



@NgModule({
  declarations: [
    UserManagementComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule
  ]
})
export class UserManagementModule { }

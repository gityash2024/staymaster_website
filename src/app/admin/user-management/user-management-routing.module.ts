import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserManagementComponent } from "./user-management.component";
import { ViewUserComponent } from "./view-user/view-user.component";

const routes: Routes = [
    {
        path: '',
        component: UserManagementComponent
    },
    {
        path: 'vu',
        component: ViewUserComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserManagementRoutingModule { }
  
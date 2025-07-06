import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdminLoginComponent } from "./admin-login.component";

const routes: Routes = [
    {
        path: '',
        component: AdminLoginComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminLoginModule { }
  
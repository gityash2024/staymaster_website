import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {  PackagesComponent } from "./packages.component";

const routes: Routes = [
    {
        path: '',
        component:PackagesComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PackagesRoutingModule { }
  
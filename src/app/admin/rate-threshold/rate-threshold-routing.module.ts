import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {  RateThresholdComponent } from "./rate-threshold.component";

const routes: Routes = [
    {
        path: '',
        component: RateThresholdComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RateThresholdRoutingModule { }
  
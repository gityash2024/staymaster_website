import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RateTemplateComponent } from "./rate-template.component";

const routes: Routes = [
    {
        path: '',
        component: RateTemplateComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RateTemplateRoutingModule { }
  
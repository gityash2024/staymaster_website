import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AminitiesComponent } from "./aminities.component";

const routes: Routes = [
    {
        path: '',
        component: AminitiesComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AminitiesRoutingModule { }
  
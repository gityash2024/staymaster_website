import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RatesAndInventoryComponent } from "./rates-and-inventory.component";

const routes: Routes = [
    {
        path: '',
        component: RatesAndInventoryComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RatesAndInventoryRoutingModule { }
  
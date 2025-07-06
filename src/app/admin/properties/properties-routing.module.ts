import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PropertiesComponent } from "./properties.component";
import { PropertyTypesComponent } from "./property-types/property-types.component";
import { AddNewPropComponent } from "./add-new-prop/add-new-prop.component";
import { ViewPropertyComponent } from "./view-property/view-property.component";

const routes: Routes = [
    {
        path: '',
        component: PropertiesComponent
    },
    {
        path: 'property-types',
        component: PropertyTypesComponent
    },
    {
        path:'addprop',
        component:AddNewPropComponent
    },
    {
        path:'viewprop',
        component:ViewPropertyComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PropertiesRoutingModule { }

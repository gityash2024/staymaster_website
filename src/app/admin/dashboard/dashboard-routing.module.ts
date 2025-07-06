import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { TodaysOverviewComponent } from "./todays-overview/todays-overview.component";
import { RevenueComponent } from "./revenue/revenue.component";
import { BookingEngineStatisticsComponent } from "./booking-engine-statistics/booking-engine-statistics.component";


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'toc',
                component: TodaysOverviewComponent,
                outlet: 'contentOutlet'  // This associates with the named outlet
            },
            {
                path: 'rc',
                component: RevenueComponent,
                outlet: 'contentOutlet'
            },
            {
                path: 'besc',
                component: BookingEngineStatisticsComponent,
                outlet: 'contentOutlet'
            },
            {
                path: 'booking-statistics',
                component: BookingEngineStatisticsComponent,
                outlet: 'contentOutlet'
            },
        ]
    },
     
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
  
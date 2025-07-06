import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { TodaysOverviewComponent } from './todays-overview/todays-overview.component';
import { RevenueComponent } from './revenue/revenue.component';
import { BookingEngineStatisticsComponent } from './booking-engine-statistics/booking-engine-statistics.component';



@NgModule({
  declarations: [
    DashboardComponent,
    TodaysOverviewComponent,
    RevenueComponent,
    BookingEngineStatisticsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule

  ]
})
export class DashboardModule { }

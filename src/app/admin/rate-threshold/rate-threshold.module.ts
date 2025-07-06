import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  RateThresholdComponent } from './rate-threshold.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RateThresholdRoutingModule } from './rate-threshold-routing.module';



@NgModule({
  declarations: [
    RateThresholdComponent
  ],
  imports: [
    CommonModule,
    RateThresholdRoutingModule,
    SharedModule
  ]
})
export class RateThresholdModule { }

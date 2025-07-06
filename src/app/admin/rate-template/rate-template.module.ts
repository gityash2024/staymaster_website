import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RateTemplateRoutingModule } from './rate-template-routing.module';
import { RateTemplateComponent } from './rate-template.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    RateTemplateComponent
  ],
  imports: [
    CommonModule,
    RateTemplateRoutingModule,
    SharedModule
  ]
})
export class RateTemplateModule { }

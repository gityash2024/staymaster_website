import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  PromotionsComponent } from './promotions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PromotionsRoutingModule } from './promotions-routing.module';



@NgModule({
  declarations: [
    PromotionsComponent
  ],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    SharedModule
  ]
})
export class PromotionsModule { }

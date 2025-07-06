import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meal-pricing-modal',
  templateUrl: './meal-pricing-modal.component.html',
  styleUrls: ['./meal-pricing-modal.component.scss']
})
export class MealPricingModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MealPricingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public reqData: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

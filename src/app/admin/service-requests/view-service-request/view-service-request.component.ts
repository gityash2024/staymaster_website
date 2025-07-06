import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-service-request',
  templateUrl: './view-service-request.component.html',
  styleUrls: ['./view-service-request.component.scss']
})
export class ViewServiceRequestComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewServiceRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public reqData: any,
    private _fb: FormBuilder,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

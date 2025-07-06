import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancellation-refund-modal',
  templateUrl: './cancellation-refund-modal.component.html',
  styleUrls: ['./cancellation-refund-modal.component.scss']
})
export class CancellationRefundModalComponent {
  cancellation_policy:string=""
  
  constructor(
    public dialogRef: MatDialogRef<CancellationRefundModalComponent>,
    @Inject(MAT_DIALOG_DATA) public reqData: any
  ) {}
  
  ngOnInit(){
    this.cancellation_policy = this.reqData.data.cancellation_policy
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

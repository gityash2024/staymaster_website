import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-house-rules-modal',
  templateUrl: './house-rules-modal.component.html',
  styleUrls: ['./house-rules-modal.component.scss']
})
export class HouseRulesModalComponent {
  house_rules: any = [];
  check_in: string =""
  check_out: string =""
  constructor(
    public dialogRef: MatDialogRef<HouseRulesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public reqData: any
  ) {}

  ngOnInit(){
    this.house_rules = this.reqData.data.house_rules
    this.check_in = this.reqData.data.check_in
    this.check_out = this.reqData.data.check_out
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatTimeString(timeString: string): Date {
    const today = new Date();
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    today.setHours(hours, minutes, seconds || 0);
    return today;
  }
}

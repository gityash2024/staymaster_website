import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-policy-modal',
  templateUrl: './privacy-policy-modal.component.html',
  styleUrls: ['./privacy-policy-modal.component.scss']
})
export class PrivacyPolicyModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PrivacyPolicyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public reqData: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  headerName : string = 'default';

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}

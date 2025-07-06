import { Component,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-decline-host',
  templateUrl: './decline-host.component.html',
  styleUrls: ['./decline-host.component.scss']
})
export class DeclineHostComponent {
  constructor(
    public dialogRef: MatDialogRef<DeclineHostComponent>,
    @Inject(MAT_DIALOG_DATA) public reqData: any,
    private _fb: FormBuilder,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

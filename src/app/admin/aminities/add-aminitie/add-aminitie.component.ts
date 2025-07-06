import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-aminitie',
  templateUrl: './add-aminitie.component.html',
  styleUrls: ['./add-aminitie.component.scss']
})
export class AddAminitieComponent {
  data: any = {
    name: ''
  };
  myForm: FormGroup = this._fb.group({});

  constructor(
    public dialogRef: MatDialogRef<AddAminitieComponent>,
    @Inject(MAT_DIALOG_DATA) public reqData: any,
    private _fb: FormBuilder,
  ) {}


  ngOnInit(): void {    
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.myForm = this._fb.group({
      name: new FormControl(''),
    });
  }

  submitForm() {
    const formValue = this.myForm.value;    
    this.data.name = formValue.name;
    this.dialogRef.close(this.data);
  }
}

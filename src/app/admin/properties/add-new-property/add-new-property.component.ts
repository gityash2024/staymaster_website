import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-property',
  templateUrl: './add-new-property.component.html',
  styleUrls: ['./add-new-property.component.scss']
})
export class AddNewPropertyComponent {
  myForm: FormGroup = this._fb.group({});
  dayNight: any = [
    { id: 1, name: 'Day'},
    { id: 2, name: 'Night'}
  ];
  typeOfPlace: any = [
    { id: 1, name: 'Villa'},
    { id: 2, name: 'Apartment'}
  ];
  mealType: any = [
    { id: 1, name: 'Veg'},
    { id: 2, name: 'Non-Veg'}
  ];
  bedroomsArr: any = [
    { id: 1, name: '1 RK'},
    { id: 2, name: '1 BHK'},
    { id: 3, name: '2 BHK'},
    { id: 4, name: '3 BHK'},
    { id: 5, name: '4 BHK'},
    { id: 6, name: '5 BHK'},
    { id: 7, name: '6 BHK'},
    { id: 8, name: '7 BHK'},
    { id: 9, name: '8 BHK'},
    { id: 10, name: '9 BHK'},
    { id: 11, name: '10 BHK'},
  ];
  aminities: any = [
    {id: 1, name: 'Wifi' },
    {id: 3, name: 'AC' },
    {id: 4, name: 'Kitchen' },
    {id: 5, name: 'Dryer' },
    {id: 6, name: 'Washing Machine' },
    {id: 7, name: 'Iron' },
    {id: 10, name: 'Gardan' }
  ];
  features: any = [
    {id: 1, name: 'Pool' },
    {id: 3, name: 'Hot Tub' },
    {id: 4, name: 'Parking' },
    {id: 5, name: 'EV Charger' },
    {id: 6, name: 'BBQ Grill' },
    {id: 7, name: 'Breakfast' },
    {id: 8, name: 'Gym' },
    {id: 9, name: 'Smoking Allowed' },
    {id: 10, name: 'Gardan' }
  ];
  constructor(
    public dialogRef: MatDialogRef<AddNewPropertyComponent>,
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
      id: new FormControl(''),
      name: new FormControl(''),
      location: new FormControl(''),
      price: new FormControl(''),
      daynight: new FormControl(''),
      bedrooms: new FormControl(''),
      typeOfPlace: new FormControl(''),
      ratings: new FormControl(''),
      mealType: new FormControl(''),
      desc: new FormControl(''),
      loc: new FormControl(''),
      staymasterSelect: new FormControl(''),
    });
  }

  submitForm() {
    const formValue = this.myForm.value;    
    // this.data.name = formValue.name;
    this.dialogRef.close(formValue);
  }
}

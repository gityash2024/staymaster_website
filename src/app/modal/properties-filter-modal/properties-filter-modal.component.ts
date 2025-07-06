import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-properties-filter-modal',
  templateUrl: './properties-filter-modal.component.html',
  styleUrls: ['./properties-filter-modal.component.scss']
})
export class PropertiesFilterModalComponent {
  allPropertyFilterModelType = Constants.allPropertyFilterModelType;
  title = '';
  bedroomsArr = [
    {
      name: 'Any',
      value: 'any',
      isChecked: false,
    },
    {
      name: '1',
      value: '1',
      isChecked: false,
    },
    {
      name: '2',
      value: '2',
      isChecked: false,
    },
    {
      name: '3',
      value: '3',
      isChecked: false,
    },
    {
      name: '4',
      value: '4',
      isChecked: false,
    },
    {
      name: '5',
      value: '5',
      isChecked: false,
    },
    {
      name: '6',
      value: '6',
      isChecked: false,
    },
    {
      name: '7',
      value: '7',
      isChecked: true,
    },
    {
      name: '8+',
      value: '8+',
      isChecked: false,
    }
  ]

  public toppings = this._formBuilder.group({
    goa: false,
    maharashtra: false,
    uttarakhand: false,
  });
  public checked = false;
  public locations = [
    {
      id: 1,
      name: 'Goa',
      checked: false,
      color: 'primary'
    },
    {
      id: 2,
      name: 'Maharashtra',
      checked: false,
      color: 'primary'
    },
    {
      id: 3,
      name: 'Uttarakhand',
      checked: false,
      color: 'primary'
    }
  ];
  constructor(
    public dialogRef: MatDialogRef<PropertiesFilterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public reqData: any,
    private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log('Modal init',this.reqData);
    this.title = this.reqData.title;
  }

  ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }

  onNoClick(){
    //this.dialogRef.close({status: 0});
    this.dialogRef.close();
  }

  onClearAllClick(){

  }

  CloseDialog() {
    this.dialogRef.close(false)
  }
}

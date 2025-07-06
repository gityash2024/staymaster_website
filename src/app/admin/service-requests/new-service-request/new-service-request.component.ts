import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-service-request',
  templateUrl: './new-service-request.component.html',
  styleUrls: ['./new-service-request.component.scss']
})
export class NewServiceRequestComponent {
  constructor(private _fb: FormBuilder){}

  myForm: FormGroup = this._fb.group({});


  ngOnInit(): void {   
   
    this.myForm = this._fb.group({
      propertyName: new FormControl(''),
      propertyCode: new FormControl(''),
      location: new FormControl(''),
      description: new FormControl(''),
      host: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      amount: new FormControl(''),
      serviceIncharge: new FormControl(''),
      contact: new FormControl(''),
    })
  }

  submitForm(){
  }

}

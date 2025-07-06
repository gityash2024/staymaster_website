import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-all-properties',
  templateUrl: './all-properties.component.html',
  styleUrls: ['./all-properties.component.scss']
})
export class AllPropertiesComponent {
  allPropertyFilterModelType = Constants.allPropertyFilterModelType
  headerName: string = 'default';
  panelOpenState = false;
  locations = new FormControl([]);
  propertyType = new FormControl([]);
  amenities = new FormControl([]);
  locationsList: string[] = ['Goa', 'Maharashtra', 'Uttarakhand'];
  propertyTypeList: string[] = ['Villa', 'Apartment'];
  amenitiesList: string[] = ['Villa', 'Apartment'];
  myForm: FormGroup = this._fb.group({});
  currentDevice: string = "";
  constructor(
    private modalService: ModalServiceService,
    private mms: ModalManagerService,
    private _fb: FormBuilder,
    private deviceService: DeviceDetectorService,
    private config: ConfigService

    ) {
      this.deviceCheck();
    }

  // @ViewChild('modal', { read: ViewContainerRef });
  @ViewChild('modalFilter', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  filterModalWith: string = '50';

  ngOnInit(): void {
    this.currentDevice = this.config.getDevice();
    this.createForm();

  }

  deviceCheck() {    
    if (this.currentDevice === Constants.deviceDimension.mobile) {
      this.filterModalWith = '90%'
    } else if (this.currentDevice === Constants.deviceDimension.tablet) {      
      this.filterModalWith = '80%'    
    } else if (this.currentDevice === Constants.deviceDimension.desktop) {
      this.filterModalWith = '50%'
    }  
  }

  createModal() {
    this.sub = this.modalService
      .openModal(this.entry, 'Are you sure want to clear all filters?', '')
      .subscribe((v) => {
        //your logic
      });
  }

  createForm() {
    this.myForm = this._fb.group({
      locations: new FormControl([]),
      propertyType: new FormControl([]),
      // locations: new FormControl([]),
    });
  }

  submitForm() {
  }

  openFilterModal(filterType:string) {

    var data: any = {
      modalWidth: this.filterModalWith
    }

    this.mms.openFilerModal({ title: filterType,  data: data }).subscribe(res => {

    })

    /* his.sub = this.modalService
      .openFilterModal(this.entry, 'Location', 'location', data)
      .subscribe((v) => {
        //your logic
        console.log('success', v);
        
      }); */
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}

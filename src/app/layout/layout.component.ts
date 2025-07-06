import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfigService } from '../services/config.service';
import { Constants } from '../constants/constants';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  filterModalWith: string = '50';
  currentDevice: string = "";
  constructor(private deviceService: DeviceDetectorService, private config: ConfigService) {
    this.deviceCheck();
  }

  deviceCheck() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();    
    isMobile ? this.filterModalWith = '90' : this.filterModalWith = '80';    
    if (isMobile) {
      this.filterModalWith = '90%'
      this.currentDevice = Constants.deviceDimension.mobile;
    } else if (isTablet) {      
      this.filterModalWith = '80%'    
      this.currentDevice = Constants.deviceDimension.tablet;
    } else if (isDesktopDevice) {
      this.filterModalWith = '50%'
      this.currentDevice = Constants.deviceDimension.desktop;
    }  
  }

  ngOnInit(): void {
    this.config.setDevice(this.currentDevice);
  }
}

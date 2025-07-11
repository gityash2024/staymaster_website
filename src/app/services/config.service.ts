import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public currentDevice: string = "";
  url = "https://thestaymaster.com/api/v1/"; // prod
  //localUrl = "http://3.109.76.188/api/";
  //localUrl = "http://localhost:8080/api";
  localUrl = "https://thestaymaster.com/api/";
  //localUrl = "https://thestaymaster.com/api/";
  constructor() { }

  getApiUrl() {
    /* if (!environment.production) {
      return this.localUrl
    } else {
      return this.url;
    } */
    return this.localUrl
  }

  setDevice(device: string) {
    this.currentDevice = device;
  }

  getDevice() { return this.currentDevice; }

}

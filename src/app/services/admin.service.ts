import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiBaseUrl: string = '';
  headers = {};
  constructor(private config: ConfigService,
    private http: HttpClient) { 
      this.apiBaseUrl = config.getApiUrl();
      /* this.headers = {
        'Content-Type': 'application/json',
        'Authorization': 
      } */
    }

    userLogin(data: any) {
      return this.http.post(this.apiBaseUrl + 'users/login', data);
    }
    addProperties(data: any) {
      return this.http.post(this.apiBaseUrl + 'properties/', data);
    }
    settingsWithUsers() {
      return this.http.get(this.apiBaseUrl + 'properties/settingsWithUsers');
    }
    masterJson() {
      return this.http.get('/assets/data/master.json');
    }
    getProperties() {
      return this.http.get(this.apiBaseUrl + 'properties/list', { withCredentials: true });
    }

    getDestinations(){
      return this.http.get(this.apiBaseUrl + 'destinations');
    }
}

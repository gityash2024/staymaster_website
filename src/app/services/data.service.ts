import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private sharedData: any;
  private PhotoGalleryData: any;
  private bookingDetails: any;
  profileData = new BehaviorSubject<any>(null)
  filterContent: Subject<any> = new Subject<any>();


  constructor(private cookieService: CookieService) { }

  setSharedData(data: any) {
    this.sharedData = data;
  }

  getSharedData() {
    return this.sharedData;
  }

  clearSharedData() {
    this.sharedData = null;
  }

  setPhotoGalleryData(data: any) {
    this.PhotoGalleryData = data;
  }

  getPhotoGalleryData() {
    return this.PhotoGalleryData;
  }

  clearPhotoGalleryData() {
    this.PhotoGalleryData = null;
  }

  setBookingData(data: any) {
    this.bookingDetails = data;
  }

  getBookingData() {
    return this.bookingDetails;
  }

  clearBookingData() {
    this.bookingDetails = null;
  }

  checkedUserLogin() {
    const tokenExists = this.cookieService.check('webUserToken');
    if (tokenExists) {
      const token = this.cookieService.get('webUserToken');
      const tokenExpiration = this.getTokenExpirationTime(token);
      const currentTime = Math.floor(Date.now() / 1000); // Convert current time to UNIX timestamp

      if (tokenExpiration && tokenExpiration > currentTime) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getWebToken() {
    const tokenExists = this.cookieService.check('webUserToken');
    if (tokenExists) {
      const token = this.cookieService.get('webUserToken');
      const tokenExpiration = this.getTokenExpirationTime(token);
      const currentTime = Math.floor(Date.now() / 1000); // Convert current time to UNIX timestamp

      if (tokenExpiration && tokenExpiration > currentTime) {
        return token;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  // Parse token and extract expiration time
  private getTokenExpirationTime(token: string): number | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      return payload.exp;
    } catch (error) {
      console.error('Error parsing token', error);
      return null;
    }
  }
}
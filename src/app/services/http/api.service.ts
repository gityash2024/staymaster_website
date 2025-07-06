import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private dataService: DataService) { }

  // All APIs Calling Method

  // Get Method
  public httpGet(endpoint: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}${endpoint}`);
  }

  // Get Method
  public httpGetWithParams(endpoint: string, params: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}${endpoint}?${params}`);
  }

  // Post Method
  public httpPost(endpoint: string, data: any): Observable<any> {
    let guestToken = this.dataService.getWebToken()
    if (guestToken) {
      data.guestToken = guestToken;
    }
    const body = new HttpParams({ fromObject: data });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post(`${environment.apiUrl}${endpoint}`, body.toString(), { headers });
  }
  public httpPostForm(endpoint: string, data: any, responseType: 'json' | 'text' = 'json'): Observable<any> {
    let guestToken = this.dataService.getWebToken();
    if (guestToken) {
      data.guestToken = guestToken;
    }
    const body = new HttpParams({ fromObject: data });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(`${environment.apiUrl}${endpoint}`, body.toString(), {
      headers,
      responseType: responseType as any, // Cast to 'any' to accommodate Angular's type limitation
    });
  }


  // Post Method
  public httpPostConfirmBooking(endpoint: string, data: any): Observable<any> {
    const body = new HttpParams({ fromObject: data });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post(`${environment.apiUrl}${endpoint}`, body.toString(), { headers });
  }

  // Put Method
  public httpPut(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}${endpoint}`, data);
  }

  // Delete Method
  public httpDelete(endpoint: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${endpoint}`);
  }

  /** Fork Join */
  public forkJoin(urls: string[]): Observable<any> {
    let response: any = [];
    for (let i = 0; i < urls.length; i++) {
      response.push(this.httpGet(urls[i]));
    }
    return forkJoin(response);
  }

  // for making query params for api urls
  public formUrlParam(url: string, data: any): string {
    let queryString: string = '';
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] !== undefined && data[key] !== null) {
        if (Array.isArray(data[key])) {
          for (const value of data[key]) {
            if (value !== undefined && value !== null) {
              if (!queryString) {
                queryString = `?${key}%5B%5D=${encodeURIComponent(value)}`;
              } else {
                queryString += `&${key}%5B%5D=${encodeURIComponent(value)}`;
              }
            }
          }
        } else {
          if (!queryString) {
            queryString = `?${key}=${encodeURIComponent(data[key])}`;
          } else {
            queryString += `&${key}=${encodeURIComponent(data[key])}`;
          }
        }
      }
    }
    return url + queryString;
  }
}

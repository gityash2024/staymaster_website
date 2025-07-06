import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RazorpayService {
    private readonly RAZORPAY_API_URL = 'https://api.razorpay.com/v1';

    constructor(private http: HttpClient) { }

    createOrder(payload: {
        amount: number;
        currency: string;
        receipt: string;
        notes?: any;
    }): Observable<any> {
        // Create Basic Auth header with Razorpay key and secret
        const headers = new HttpHeaders().set(
            'Authorization',
            'Basic ' + btoa(`${environment.RAZORPAY_KEY}:${environment.RAZORPAY_KEY_SECRET}`)
        ).set('Content-Type', 'application/json');

        return this.http.post(
            `${this.RAZORPAY_API_URL}/orders`,
            payload,
            { headers }
        );
    }
}
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService,private dataService: DataService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest: any = request;
    // Add authorization token to the request headers;
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYXBpX3VzZXJAdGhlc3RheW1hc3Rlci5jb20iLCJpZCI6MjB9LCJpYXQiOjE3MDk0NDg0OTh9.t8gKWETvXtOBC_sLOjYbCcIzIrROpvhlGRFG4zGEOLI';
    let guestToken = this.dataService.getWebToken()
    authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        ...(guestToken != ''  && { 'guestToken': guestToken }),
      }
    });
    // Handle the request and catch any errors
    return next.handle(authRequest).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {

      }
    }),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler(error);
        return throwError(error);
      })
    );
  }

  /** Error handling */
  private errorHandler(error: HttpErrorResponse, type: string = 'error') {
    switch (error.status) {
      case 401: {
        this.toastr.error(error.error.message);
        // this.sharedService.logout();
        break;
      }
      case 400: {
        this.toastr.error(error.error.error);
        break;
      }
      case 404: {
        this.toastr.error(error.error.message);
        break;
      }
      case 500: {
        this.toastr.error(error.error.message);
        break;
      }
      case 403: {
        this.toastr.error(error.error.message);
        break;
      }
      case 422: {
        this.toastr.error(error.error.errors[0].msg);
        break;
      }
      case 0: {
        this.toastr.error('Seems there is some problem with the server. Try later!');
        break;
      }
    }
  }
}



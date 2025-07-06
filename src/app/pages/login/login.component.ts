import { Component, EventEmitter, Inject, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/http/api.service';
import { ModalManagerService } from 'src/app/services/modal-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  verifyMobile: boolean = false;
  otp: string[] = ['', '', '', '', '', ''];
  phoneNumber: number;
  selectedISD: string = '91';
  constructor(
    @Optional() public dialogRef: MatDialogRef<LoginComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public reqData: any,
    private mms: ModalManagerService,
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  onNoClick(): void {
    this.dialogRef?.close();
  }

  otpClick(): void {


    let payload = {
      phone: this.selectedISD + this.phoneNumber,
      otp: this.otp.join('')
    };

    this.apiService.httpPost(`${'/ext/loginWithOTP'}`, payload).subscribe((res: any) => {
      if (res.webUserToken) {
        this.dialogRef?.close();
        this.router.navigate(['profile']);
        localStorage.setItem('user', JSON.stringify(res.user));
        const now = new Date();
        const expireDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
        this.cookieService.set('webUserToken', res.webUserToken, expireDate, '/');
        // localStorage.setItem('token', res.webUserToken);
      }
    })
  }


  onKeydown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (event.key >= '0' && event.key <= '9') {
      this.otp[index] = event.key;
      if (index < this.otp.length - 1) {
        const nextInput = document.querySelectorAll('.otp-text')[index + 1] as HTMLInputElement;
        nextInput.focus();
      }
    } else if (event.key === 'Backspace') {
      this.otp[index] = '';
      if (index > 0) {
        const previousInput = document.querySelectorAll('.otp-text')[index - 1] as HTMLInputElement;
        previousInput.focus();
      }
    }
    event.preventDefault();
  }

  loginClick() {
    let payload = {
      phone: this.selectedISD + this.phoneNumber
    };
    this.apiService.httpPost(`${'/ext/generateOTP'}`, payload).subscribe((res: any) => {
      if (res.otp) {
        this.verifyMobile = true;
        // this.otp = res.otp.toString().split('');
      }
    })
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
  
    if (!/^[0-9]$/.test(value)) {
      this.otp[index] = '';
      return;
    }
  
    this.otp[index] = value;
  
    if (index < this.otp.length - 1 && value) {
      const nextInput = document.querySelectorAll('.otp-text')[index + 1] as HTMLInputElement;
      nextInput?.focus();
    }
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  // verifyMobile: boolean = false;
  constructor(
    private mms: ModalManagerService,
    private router: Router,
    private adminService:AdminService
  ) {}

  onNoClick(): void {
    // this.dialogRef.close();
  }

  otpClick(): void {
    localStorage.setItem('userLoggedIn', '1');
    // this.dialogRef.close();
    this.router.navigate(['profile']);
  }

  loginClick() {    

      let data = {
        email: this.username,
        password: this.password
      };
      this.adminService.userLogin(data).subscribe((res: any) => { 
        alert(JSON.stringify(res))
        this.router.navigate(['admin']);
      });
    }
  
}
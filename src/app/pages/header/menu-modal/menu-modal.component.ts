import { Component, EventEmitter, Inject, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { ModalManagerService } from 'src/app/services/modal-manager.service';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss']
})
export class MenuModalComponent {
  
  @Output() closeModal = new EventEmitter();
  userLoggedIn: boolean = false;
  constructor(
    @Optional() public dialogRef: MatDialogRef<MenuModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public reqData: any,
    private mms: ModalManagerService,
    private router: Router,
    private dataService: DataService,
    private cookieService: CookieService
  ) {
    // this.userLoggedIn = localStorage.getItem('userLoggedIn')?.toString();
  }

  ngOnInit() {
    this.userLoggedIn = this.dataService.checkedUserLogin();
  }

  onNoClick(): void {
    this.dialogRef?.close();
    this.closeModal.emit();
  }

  loginModal() {
    this.dialogRef?.close();
    this.mms.loginModal({id: 0}).subscribe((res: any) => {});
  }

  logOut() {
    this.cookieService.delete('webUserToken');
    localStorage.clear();
    this.dialogRef?.close();
    this.router.navigate(['']);
  }
}

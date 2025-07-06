import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/http/api.service';
import { ModalManagerService } from 'src/app/services/modal-manager.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  selectedGender: string = '';
  user: any;
  id: number = 0
  name: string = ""
  firstname: string = ""
  lastname: string = ""
  email: string = ""
  phone: string = ""
  overlayVisible: boolean = false;
  constructor(
    private mms: ModalManagerService,
    private apiService: ApiService,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    let userlogin = this.dataService.checkedUserLogin()
    this.user = localStorage.getItem('user');
    if (!userlogin) {
      this.router.navigate(['/home']);
    } else {
      if (this.user) {
        this.user = JSON.parse(this.user)
        this.id = this.user.id
        this.firstname = this.user.firstname
        this.lastname = this.user.lastname
        this.email = this.user.email
        this.phone = this.user.phone
      } else {
        this.getProfile(this.user.id)
      }
    }
  }

  toggleMenu() {
    const isMobile = window.innerWidth <= 992;;
    if (isMobile) {
			this.overlayVisible = true;
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
		else this.mms.topMenuModal({ id: 0 }).subscribe((res: any) => {});
  }
  onSelectGender(selected: string) {
    this.selectedGender = selected;
  }

  getProfile(id: any) {
    let pagePayload = { "id": id }
    this.apiService.httpPost(`${'/ext/getProfile'}`, pagePayload).subscribe((res: any) => {
      if (res.id) {
        this.id = res.id
        this.firstname = res.firstname
        this.lastname = res.lastname
        this.email = res.email
        this.phone = res.phone
        localStorage.setItem('user', JSON.stringify(res))
      }
    });
  }

  setProfile() {
    const setData = {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      phone: this.phone
    }
    this.apiService.httpPost(`${'/ext/updateProfile'}`, setData).subscribe((res: any) => {
      if (res.message) {
        this.getProfile(this.id);
        this.router.navigate(['/trips']);

      }
    });
  }
}

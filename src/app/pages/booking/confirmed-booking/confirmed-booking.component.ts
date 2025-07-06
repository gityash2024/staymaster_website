import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/http/api.service';

@Component({
  selector: 'app-confirmed-booking',
  templateUrl: './confirmed-booking.component.html',
  styleUrls: ['./confirmed-booking.component.scss']
})
export class ConfirmedBookingComponent {
  headerName: string = 'default';
  bookingDetails:any;
  currentUr:any;
  isSmallScreen = window.innerWidth <= 768;
  showSuccess: boolean = false;
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute){

  }

  ngOnInit() {
    this.currentUr = window.location.href;
    this.route.queryParams.subscribe(async params => {
      let bookingId = params['bookingId'];
      this.showSuccess = params['showSuccess'];
      if (this.showSuccess) {
        setTimeout(() => {
          this.showSuccess = false;
          this.loading = true;
          setTimeout(() => this.loading = false , 1000);
        }, 2000);
      }
  
      if (bookingId) {
        this.apiService.httpGet('/ext/myBooking/'+bookingId).subscribe((data:any) =>{
          this.bookingDetails = data; 
        })
      }
    })

    this.onResize();
  }

 
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isSmallScreen = window.innerWidth <= 768;
  }
}

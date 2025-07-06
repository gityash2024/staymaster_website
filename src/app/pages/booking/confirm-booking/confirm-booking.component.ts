import { ChangeDetectorRef, Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/http/api.service';
import { ExternalLibraryService } from './util';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
declare let Razorpay: any;
import { Location } from '@angular/common';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss']
})
export class ConfirmBookingComponent {
  bookingForm: FormGroup;
  headerName: string = 'default';
  guests: any = [];
  bookingDetails: any;
  userLoggedIn: boolean = false;
  otpSent: boolean = false;
  selfBooking: boolean = true;
  phoneNumber: number | null;
  otp: string[] = ['', '', '', '', '', ''];
  userLoginSuccess: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  selectedGuestCount: any;
  totalTax: number = 0;
  razorpayResponse: any;
  // user: { "firstname": string, "lastname": string, "email": string, "phone": string } = { "firstname": "", "lastname": "", "email": "", "phone": "" }
  user: any;
  selectedISD: string = '91'; // Default ISD code for India
  isdCodes = [
    { label: 'IND (+91)', value: '91' },
    { label: 'USA (+1)', value: '1' },
    { label: 'UK (+44)', value: '44' },
    { label: 'AUS (+61)', value: '61' }
  ];
  RAZORPAY_OPTIONS: any = {
    "key": environment.RAZORPAY_KEY,
    "amount": "",
    "name": "Staymaster Pay",
    "currency": "INR",  // Currency type
    "order_id": "",
    "description": "Hotel Booking Payment",
    "image": "https://staymaster-public.s3.ap-south-1.amazonaws.com/staymaster_logo.jpeg",
    "prefill": {
      "name": "",
      "email": "",
      "contact": "",
      "method": ""
    },
    "modal": {},
    "theme": {
      "color": "#008281"
    }
  };
  allChecked: boolean = false;
  totalSelectedGuest: any;
  @ViewChild('cancellationPolicy') cancellationPolicy: MatCheckbox;
  @ViewChild('houseRules') houseRules: MatCheckbox;
  isMobileView: boolean = false;
  loading: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    private cookieService: CookieService,
    private razorpayService: ExternalLibraryService,
    private cd: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private location: Location,
  ) {
    // this.addDefaultGuest();
    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();
  }

  ngOnInit() {

    this.bookingForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['IND(+91)', Validators.required],
      cancellationPolicyChecked: [false, Validators.requiredTrue],
      houseRulesChecked: [false, Validators.requiredTrue]
    });
    this.userLoggedIn = this.dataService.checkedUserLogin();
    const bookingData = this.dataService.getBookingData();
    const tripData = this.dataService.getSharedData();
    console.log("tripData", tripData)
    if (bookingData) {
      this.bookingDetails = bookingData
      if (typeof tripData.selectedGuest === 'number') {
        // If it's a number, treat it as all adults
        this.selectedGuestCount = {
          number_adults: tripData.selectedGuest,
          number_children: 0
        };
      } else if (typeof tripData.selectedGuest === 'object') {
        // Assume it's an object with adults and children
        this.selectedGuestCount = {
          number_adults: tripData.selectedGuest.number_adults || 0,
          number_children: tripData.selectedGuest.number_children || 0
        };
      } else {
        // Fallback for unexpected data types
        this.selectedGuestCount = {
          number_adults: 0,
          number_children: 0
        };
      } this.totalSelectedGuest = this.countSelectedGuest();
      this.checkInDate = tripData.checkInDate
      this.checkOutDate = tripData.checkOutDate
      // for (const date in this.bookingDetails.room_rates_info.tax) {
      //   this.totalTax += this.bookingDetails.room_rates_info.tax[date];
      // }
      this.totalTax += this.bookingDetails.total_taxes;
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user)
      // Pre-fill the user data ignoring the id
      if (this.user) {
        this.bookingForm.patchValue({
          firstname: this.user.firstname || '',
          lastname: this.user.lastname || '',
          email: this.user.email || '',
          phone: this.user.phone || ''
        });
      }
    } else {
      this.router.navigate(['/stay']);
    }
    this.isMobileView = window.innerWidth <= 992;
  }

  countSelectedGuest() {
    if (!this.selectedGuestCount) return 0;
    const adults = this.selectedGuestCount.number_adults || 0;
    const children = this.selectedGuestCount.number_children || 0;
    const total = adults + children;
    return total;
  }

  validateCheckboxes() {
    const isCancellationChecked = this.cancellationPolicy.checked;
    const isHouseRulesChecked = this.houseRules.checked;

    this.allChecked = isCancellationChecked && isHouseRulesChecked;
  }

  addDefaultGuest() {
    let geust = {
      no: 1,
      firstName: '',
      lastName: '',
      countryCode: '',
      mobile: '',
      email: '',
    }
    this.guests.push(geust);
  }

  addGuest() {
    let totalAddedGuest = this.guests?.length + 1;
    if (totalAddedGuest <= 8) {
      let geust = {
        no: this.guests?.length + 1,
        firstName: '',
        lastName: '',
        countryCode: '',
        mobile: '',
        email: '',
      }
      this.guests.push(geust);
    } else {
      this.toastr.error('You can add up to 8 guests only');
    }
  }
  removeGuest(index: number) {
    this.guests.splice(index);
  }
  ifNotLoggedIn() {
    this.userLoggedIn = false;
  }
  confirmMobile() {
    if(!this.phoneNumber) {
      this.toastr.error(`Please add Mobile number!`);
      return;
    }


    const phoneStr = this.phoneNumber.toString();
    const digitsOnly = phoneStr.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      this.toastr.error('Mobile number must be exactly 10 digits and only numbers!');
      return;
    }

    let phoneNumber = this.selectedISD + this.phoneNumber;
    let payload = {
      phone: phoneNumber
    };
    this.apiService.httpPost(`${'/ext/generateOTP'}`, payload).subscribe((res: any) => {
      if (res.otp) {
        this.otpSent = true;
        // this.otp = res.otp.toString().split('');
      }
    })
  }
  otpConfirm() {
    let phoneNumber = this.selectedISD + this.phoneNumber;

    let payload = {
      phone: phoneNumber,
      otp: this.otp.join('')
    };

    this.apiService.httpPost(`${'/ext/loginWithOTP'}`, payload).subscribe((res: any) => {
      if (res.webUserToken) {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.user = res.user;
        const rawPhone = this.user.phone;
        const phoneWithoutCode = rawPhone.length > 10 ? rawPhone.slice(-10) : rawPhone;
        const userData = {
          firstname: this.user.firstname || '',
          lastname: this.user.lastname || '',
          email: this.user.email || '',
          phone: phoneWithoutCode || ''
        }
        const now = new Date();
        const expireDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
        this.cookieService.set('webUserToken', res.webUserToken, expireDate, '/');
        this.userLoggedIn = true;
        this.otpSent = false;
        this.bookingForm.patchValue(userData);
        this.toastr.success(`Hey ! You've logged in successfully`);
      }
    })
  }

  confirmAndPay(id: any) {
    this.user.firstname = this.bookingForm.get("firstname")?.value;
    this.user.lastname = this.bookingForm.get("lastname")?.value;
    this.user.email = this.bookingForm.get("email")?.value;
    let phoneNumber = this.bookingForm.get("phone")?.value;
    this.user.phone = this.selectedISD + phoneNumber;
    console.log(this.user.phone)
    this.loading = true;
    let guestToken = this.dataService.getWebToken()
    const payload: any = {};
    payload.check_in_date = moment(this.checkInDate).format('YYYY-MM-DD');
    payload.check_out_date = moment(this.checkOutDate).format('YYYY-MM-DD');
    payload.property_id = this.bookingDetails.id;
    payload.number_adults = this.selectedGuestCount.number_adults;
    payload.number_children = this.selectedGuestCount.number_children;
    payload.main_guest = JSON.stringify(this.user);
    payload.guests = JSON.stringify(this.guests);
    payload.guestToken = guestToken;
    payload.breakfast_included = 0;
    payload.bookingForSelf = this.selfBooking ? 1 : 0;
    payload.stay_type = 1;
    payload.transaction_id = id.razorpay_payment_id;
    this.apiService.httpPostConfirmBooking(`${'/ext/createBooking'}`, payload).subscribe((res: any) => {
      if (res.success) {
        console.log(res)
        // this.dataService.profileData.next(res);
        this.router.navigate(['confirmed-booking'], {
          queryParams: {
            bookingId: res.info.booking.id,
            showSuccess: true
          }
        });
        this.loading = false;
      } else {
        this.loading = false;
      }
    }, (error: any) => {
      this.loading = false;
      if (error.error.error) {
        this.toastr.error(error.error.error, '', {
          timeOut: 10000,
        });
      }
      if (error.error?.booking?.ErrorDescription) {
        this.toastr.error(error.error?.booking?.ErrorDescription, '', {
          timeOut: 10000,
        });
      }
    })
  }

  bokkingForSelect(selected: any) {
    this.selfBooking = selected;
    if (selected) {
      this.guests = [];
      this.addDefaultGuest();
    }
  }

  showDesc(){
    const form = document.querySelector('.confirmation-form') as HTMLElement;
    const desc = document.querySelector('.confirmation-desc') as HTMLElement;
    if(desc) desc.style.setProperty('display', 'none', 'important')
    if(form) form.style.setProperty('display', 'block', 'important');
  }

  public async proceed() {
    if (this.bookingForm.invalid) {
      this.toastr.error('Please fill out all required fields correctly.');
      this.bookingForm.markAllAsTouched();
      return;
    }

    try {
      this.loading = true;
      console.log(this.bookingDetails, "bookingDetails")
      // 1. Create order
      const orderPayload = {
        amount: this.bookingDetails?.totalprice_inclusive_all * 100, // Convert to paise
        currency: 'INR',
        receipt: `BOOK_${Date.now()}`, // Unique receipt ID
        notes: JSON.stringify({
          propertyId: this.bookingDetails.id,
          checkIn: this.checkInDate,
          checkOut: this.checkOutDate,
          guestName: `${this.bookingForm.get('firstname')?.value} ${this.bookingForm.get('lastname')?.value}`
        })
      };

      // // Create order
      // const orderResponse = await this.razorpayServiceApi.createOrder(orderPayload).toPromise();
      // this.RAZORPAY_OPTIONS.order_id = orderResponse.id;

      // // 3. Create Razorpay instance and open payment modal
      // const razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
      // razorpay.on('payment.failed', (response: any) => {
      //   // this.handlePaymentFailure(response.error.description);
      // });
      this.apiService
        .httpPost('/ext/generateOrderId', orderPayload)
        .subscribe(
          (res: any) => {
            if (res) {
              this.RAZORPAY_OPTIONS.order_id = res.data.id;
              this.RAZORPAY_OPTIONS.handler = this.razorPaySuccessHandler.bind(this);

              // this.RAZORPAY_OPTIONS.amount = res.data.amount
              // 3. Create Razorpay instance and open payment modal
              const razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
              razorpay.on('payment.failed', (response: any) => {
                console.log(response)
                // this.handlePaymentFailure(response.error.description);
              });

              razorpay.open();
              console.log(razorpay)
            }
          },
          (error: any) => {
            // this.handlePaymentFailure(error.message || 'Failed to initialize payment');
          }
        );


    } catch (error: any) {
      // this.handlePaymentFailure(error.message || 'Failed to initialize payment');
    } finally {
      this.loading = false;
    }
  }

  public razorPaySuccessHandler(response: any) {
    console.log(response)

    this.razorpayResponse = response;
    this.confirmAndPay(this.razorpayResponse);
    this.cd.detectChanges()
  }

  getExclusiveTaxLength(obj: any): number {
    return Object.keys(obj).length;
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

  calculateFinalPrice(): number {
    if ( this.bookingDetails?.extra_person_charges_per_night && this.bookingDetails?.price_per_night)
        return ( this.bookingDetails?.price_per_night - this.bookingDetails.extra_person_charges_per_night );
    return this.bookingDetails?.price_per_night || 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    if (windowWidth <= 992) this.isMobileView = true;
    else {
      const form = document.querySelector('.confirmation-form') as HTMLElement;
      const desc = document.querySelector('.confirmation-desc') as HTMLElement;
    
      if (desc) desc.style.removeProperty('display');
      if (form) form.style.removeProperty('display');
      this.isMobileView = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onAnyClick(event: MouseEvent) {
    this.isMobileView = window.innerWidth <= 992;
  }

  goBack(){
    this.location.back();
  }

  resetDesc(){
    const form = document.querySelector('.confirmation-form') as HTMLElement;
    const desc = document.querySelector('.confirmation-desc') as HTMLElement;
    if (desc) desc.style.removeProperty('display');
    if (form) form.style.removeProperty('display');
    this.otpSent = false;
    this.phoneNumber = null;
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
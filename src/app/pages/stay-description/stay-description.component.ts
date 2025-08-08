import { Component, HostListener } from '@angular/core';
import { Constants } from 'src/app/constants/constants';
import { ConfigService } from 'src/app/services/config.service';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/http/api.service';
import { DataService } from 'src/app/services/data.service';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Util } from 'src/app/shared/utilities';
@Component({
  selector: 'app-stay-description',
  templateUrl: './stay-description.component.html',
  styleUrls: ['./stay-description.component.scss'],
})
export class StayDescriptionComponent {
  staySelect: boolean = false;
  staySelectDefaultColor: string = 'rgba(255, 255, 255, 0.7)';
  staySelectColor: string = 'rgba(88, 65, 57, 0.72)';
  staySelectBgColor: string = '';
  staySelectDefaultBgColor: string = '';
  ModalWith: string = '50%';
  currentDevice: string = '';
  totalTax: number = 0;
  propertyDetails: any = [];
  headerName: string = 'transparant';
  panelOpenState = false;
  checkInDate: string = new Date().toISOString().slice(0, 10);
  checkOutDate: string = new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().slice(0, 10);
  selectedGuestCount: {number_adults: number, number_children: number} = {number_adults: 2, number_children: 0};
  totalSelectedGuest: any = 1;
  filteredAmenities: any;
  activeMenuItemIndex: number = 0;
  id: number = 0;
  showShareButtons = false;

  pagePayload: {
    check_in_date: string;
    check_out_date: string;
    destination: number;
    number_adults: string;
    number_children: string;
  } = {
    check_in_date: '',
    check_out_date: '',
    destination: 0,
    number_adults: '',
    number_children: '',
  };

  propertyLoading: boolean = true;
  scrolledToFooter: boolean = false;
  showShareMenu: boolean = false;

  // Calendar loading state
  isCalendarLoading: boolean = false;
  calendarData: any = null;
  calendarLoadingError: string = '';
  calendarLoadingComplete: boolean = false; // Add completion flag
  private calendarCache: Map<string, any> = new Map(); // Cache for calendar data

  toggleShareButtons(): void {
    this.showShareButtons = !this.showShareButtons;
  }
  shareVia(platform: string): void {
    const urlToShare = 'https://example.com';
    const encodedUrl = encodeURIComponent(urlToShare);

    let shareUrl = '';
    switch (platform) {
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
        break;
      case 'instagram':
        alert('Instagram sharing is not supported via web.');
        return;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      default:
        console.error('Unsupported platform');
        return;
    }

    window.open(shareUrl, '_blank');
  }
  constructor(
    private apiService: ApiService,
    private mms: ModalManagerService,
    private config: ConfigService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {    
    this.route.params.subscribe((params) => {
      if (!params['id']) {
        this.router.navigate(['/stay']);
      } else {
        // this.spinner.show();
        this.propertyLoading = true;
        this.getHotelDetails(params['id']);
        this.id = params['id'];
        
        // Start loading calendar data for 1 year in background
        this.initializeCalendarData(params['id']);
      }
    });
    this.currentDevice = this.config.getDevice();
    this.deviceCheck();
    // const data = this.dataService.getSharedData();
    // if (data) {
    //   this.selectedGuestCount = data.selectedGuest || null;
    //   this.totalSelectedGuest =
    //     this.selectedGuestCount?.number_adults +
    //     this.selectedGuestCount?.number_children;
      // this.checkInDate = data.checkInDate;
      // this.checkOutDate = data.checkOutDate;
    // }
  }

  /**
   * Initialize calendar data loading for 200 days in background
   */
  private initializeCalendarData(propertySlug: string) {
    // Check if we already have cached data for this property
    const cacheKey = `calendar_${propertySlug}`;
    const cachedData = this.calendarCache.get(cacheKey);
    
    if (cachedData) {
      console.log('Using cached calendar data for:', propertySlug);
      this.calendarData = cachedData;
      this.isCalendarLoading = false;
      this.calendarLoadingComplete = true; // Set completion flag
      return;
    }

    // Check if we're already loading data for this property
    if (this.isCalendarLoading) {
      console.log('Calendar data already loading for:', propertySlug);
      return;
    }
    
    this.isCalendarLoading = true;
    this.calendarLoadingComplete = false; // Reset completion flag
    this.calendarLoadingError = '';
    
    console.log('Starting 200-day calendar data loading for:', propertySlug);
    
    const payload = {
      propertyId: propertySlug,
      days: 200 // 200 days of data
    };
    
    this.apiService.httpPost('/ext/calendarAvailabilityImproved', payload).subscribe({
      next: (res: any) => {
        console.log('✅ Calendar API response received for:', propertySlug);
        if (res && res.success && res.property) {
          this.calendarData = res.property;
          this.calendarCache.set(cacheKey, res.property); // Cache the data
          this.isCalendarLoading = false; // Important: Set loading to false
          this.calendarLoadingComplete = true; // Set completion flag
          console.log('✅ Calendar data loaded and cached successfully:', Object.keys(this.calendarData).length, 'days');
          
          // Force broadcast completion to all child components
          this.broadcastCalendarCompletion();
        } else {
          this.calendarLoadingError = 'Failed to load calendar data';
          this.isCalendarLoading = false;
          this.calendarLoadingComplete = true; // Set completion flag even on error
          console.error('❌ Invalid calendar response:', res);
        }
      },
      error: (error: any) => {
        console.log('❌ Calendar API error for:', propertySlug, error);
        
        // Handle specific error types
        let errorMessage = 'Error loading calendar data';
        if (error.status === 504 || error.status === 0) {
          errorMessage = 'Server timeout - calendar data may still be processing';
          console.log('⏰ Server timeout detected - calendar may still be loading in background');
          
          // For timeout errors, try to continue with basic functionality
          // Don't show error toast since data might still be processing
          this.calendarLoadingError = '';
        } else if (error.status >= 500) {
          errorMessage = 'Server error - please try again later';
        } else if (error.status === 404) {
          errorMessage = 'Property not found';
        } else {
          errorMessage = error.message || 'Network error loading calendar';
        }
        
        this.calendarLoadingError = errorMessage;
        this.isCalendarLoading = false; // Important: Set loading to false on error too
        this.calendarLoadingComplete = true; // Set completion flag even on error
        
        // For non-timeout errors, log the full error
        if (error.status !== 504 && error.status !== 0) {
          console.error('❌ Calendar loading error:', error);
        }
      }
    });
  }

  /**
   * Broadcast calendar completion to force update child components
   */
  private broadcastCalendarCompletion() {
    // Force change detection
    setTimeout(() => {
      console.log('🔄 Broadcasting calendar completion to child components');
      // Trigger any open calendar dialogs to update
      const event = new CustomEvent('calendarDataReady', { 
        detail: { 
          data: this.calendarData,
          complete: true 
        } 
      });
      window.dispatchEvent(event);
    }, 100);
  }

  /**
   * Get calendar loading status for the date picker component
   */
  getCalendarLoadingStatus() {
    return {
      isLoading: this.isCalendarLoading,
      data: this.calendarData,
      error: this.calendarLoadingError,
      complete: this.calendarLoadingComplete, // Add completion flag
      forceStopLoading: () => {
        this.isCalendarLoading = false;
        this.calendarLoadingComplete = true;
        console.log('🛑 Force stopped calendar loading');
      }
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.adjustWhatsappButton();
    }, 500);
  }

  ngOnDestroy(): void {
    this.resetWhatsappBtnPosition();
  }

  private setUrlParams() {
    const queryParams = this.route.snapshot.queryParams;
    this.pagePayload = Object.assign(this.pagePayload, {
      check_in_date: queryParams['check_in_date'],
      check_out_date: queryParams['check_out_date'],
      destination: queryParams['destination'],
      number_adults: isNaN(Number(queryParams['number_adults'])) ? 0 : Number(queryParams['number_adults']),
      number_children: isNaN(Number(queryParams['number_children'])) ? 0 : Number(queryParams['number_children']),
    });
    if (this.pagePayload.check_in_date) this.checkInDate = this.pagePayload.check_in_date;
    if (this.pagePayload.check_out_date) this.checkOutDate = this.pagePayload.check_out_date;
    if (this.pagePayload.number_adults) this.selectedGuestCount = { number_adults: Number(this.pagePayload.number_adults), number_children: Number(this.pagePayload.number_children) };
  }

  deviceCheck() {
    if (this.currentDevice === Constants.deviceDimension.mobile) {
      this.ModalWith = '90%';
    } else if (this.currentDevice === Constants.deviceDimension.tablet) {
      this.ModalWith = '80%';
    } else if (this.currentDevice === Constants.deviceDimension.desktop) {
      this.ModalWith = '50%';
    }
  }

  setActiveMenuItem(index: number) {
    this.activeMenuItemIndex = index;
    this.scrollToSection(index);
  }

  scrollToSection(index: number) {
    const sections = [
      'descriptionSection',
      'amenitiesSection',
      'mealsSection',
      'locationSection',
      'houseRulesSection',
      'faqsSection',
    ];
    const sectionId = sections[index];
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  staySelectClick() {
    this.staySelect = !this.staySelect;
  }

  getIconUrl(icon: string): string {
    if (icon && icon !== 'null') {
      return `../../../assets/images/${icon}`;
    } else {
      // Default image or placeholder
      return `../../../assets/images/select.png`;
    }
  }

  mealPricingModal() {
    var data: any = {
      modalWidth: this.ModalWith,
    };
    this.mms.mealPricingModal({ data: data }).subscribe((res: any) => {});
  }
  houseRulesModal() {
    var data: any = {
      house_rules: this.propertyDetails.house_rules,
      check_in: this.propertyDetails.check_in,
      check_out: this.propertyDetails.check_out,
    };
    this.mms.houseRulesModal({ data: data }).subscribe((res: any) => {});
  }
  privacyPolicyModal() {
    this.mms.privacyPolicyModal({ id: 0 }).subscribe((res: any) => {});
  }
  cancellationRefundModal() {
    var data: any = {
      cancellation_policy: this.propertyDetails.cancellation_policy,
    };
    this.mms
      .cancellationRefundModal({ data: data })
      .subscribe((res: any) => {});
  }

  photoGalleryModal() {
    this.dataService.setPhotoGalleryData(this.propertyDetails.medias);
    this.router.navigate([`/stay-description/${this.id}/photo-gallery`]);
  }

//   photoGalleryModal() {
//     this.dataService.setPhotoGalleryData(this.propertyDetails.medias);
//     const url = this.router.serializeUrl(
//         this.router.createUrlTree([`/stay-description/${this.id}/photo-gallery`])
//     );
//     window.open(url, '_blank');
// }
  aboutPropertyModal() {
    var data: any = {
      modalWidth: this.ModalWith,
      description_summary: this.propertyDetails.description_summary,
      description_bedrooms_and_bath:
        this.propertyDetails.description_bedrooms_and_bath,
      description_living_and_dining:
        this.propertyDetails.description_living_and_dining,
      description_kitchen_space: this.propertyDetails.description_kitchen_space,
      description_pool: this.propertyDetails.description_pool,
      description_hospitality_service:
        this.propertyDetails.description_hospitality_service,
      description_unique_highlights:
        this.propertyDetails.description_unique_highlights,
    };
    this.mms.openAboutPropertyModal({ data: data }).subscribe((res: any) => {});
  }

  aboutAmenityModal() {
    var data: any = {
      modalWidth: this.ModalWith,
      amenitiesWithDescriptions: this.propertyDetails.amenitiesWithDescriptions,
    };
    this.mms.openAboutAmenityModal({ data: data }).subscribe((res: any) => {});
  }

  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }

  countSelectedGuest() {
//  return   this.propertyDetails.adults
    return (this.selectedGuestCount?.number_adults) ? this.selectedGuestCount?.number_adults + this.selectedGuestCount.number_children : this.propertyDetails.adults;
  }

  getHotelDetails(id: number) {
    console.log("iddd")
    const payload: any = {};
    payload.slug = id;
    this.setUrlParams();
    if (this.checkInDate != '' && this.checkOutDate != '') {
      payload.check_in_date = moment(this.checkInDate).format('YYYY-MM-DD');
      payload.check_out_date = moment(this.checkOutDate).format('YYYY-MM-DD');
    }
    if (this.selectedGuestCount?.number_adults) {
      payload.number_adults = this.selectedGuestCount?.number_adults;
    }
    if (this.selectedGuestCount?.number_children) {
      payload.number_children = this.selectedGuestCount?.number_children;
    }
    this.apiService
      .httpPost(`${'/ext/availabilityAndDetails'}`, payload)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.propertyDetails = res.data;
            console.log("this.propertyDetails", this.propertyDetails)
            this.staySelect = this.propertyDetails.staymaster_select;
            // for (const date in this.propertyDetails.total_taxes) {
            this.totalTax += this.propertyDetails.total_taxes;
            // }
            this.filteredAmenities =
              this.propertyDetails.amenitiesWithDescriptions.filter(
                (amenity: any) => amenity.icon !== null
              );
            this.spinner.hide();
            this.propertyLoading = false;
          } else {
            // this.router.navigate(['/stay'], {
            //   queryParams: {
            //     from: 'des',
            //   }
            // });
          }
          this.spinner.hide();
          this.propertyLoading = false;
        },
        (error: any) => {
          if (error.status === 400) {
            this.spinner.hide();
            this.propertyLoading = false;
            // this.router.navigate(['/stay'], {
            //   queryParams: {
            //     from: 'des',
            //   }
            // });
          }
        }
      );
  }

  async changeHotelDetails(id: number) {
    // this.spinner.show();
    this.propertyLoading = true;
    const payload: any = {};
    payload.check_in_date = this.checkInDate
      ? moment(this.checkInDate).format('YYYY-MM-DD')
      : null;
    payload.check_out_date = this.checkOutDate
      ? moment(this.checkOutDate).format('YYYY-MM-DD')
      : null;
    payload.slug = id;
    if (this.selectedGuestCount) {
      payload.number_adults = this.selectedGuestCount?.number_adults;
      payload.number_children = this.selectedGuestCount?.number_children;
      this.totalSelectedGuest =
        this.selectedGuestCount?.number_adults +
        this.selectedGuestCount.number_children;
    }
    console.log(payload,"....");
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...Util.purifyObject(payload) },
      queryParamsHandling: 'merge'
    });
    await this.apiService
      .httpPost(`${'/ext/availabilityAndDetails'}`, payload)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.propertyDetails = res.data;
            this.staySelect = this.propertyDetails.staymaster_select;
            // for (const date in this.propertyDetails.room_rates_info.tax) {
            //   this.totalTax += this.propertyDetails.room_rates_info.tax[date];
            // }
            this.totalTax += this.propertyDetails.total_taxes;
            this.filteredAmenities =
              this.propertyDetails.amenitiesWithDescriptions.filter(
                (amenity: any) => amenity.icon !== null
              );
            this.spinner.hide();
            this.propertyLoading = false;
            if (res.message) {
              this.toastr.error(res.message);
            }
          }
          this.spinner.hide();
          this.propertyLoading = false;
        },
        (error: any) => {
          if (error.status === 400) {
            this.spinner.hide();
            this.propertyLoading = false;
            // this.router.navigate(['/stay'], {
            //   queryParams: {
            //     from: 'des',
            //   }
            // });
          }
        }
      );
  }

  confirmBooking() {
    console.log(this.selectedGuestCount,this.propertyDetails.adults,">>>")
    if (!this.selectedGuestCount?.number_adults) {
      this.selectedGuestCount.number_adults = this.propertyDetails.adults
      // this.toastr.error('Please select guest');

      // return;
    }
    
    const setData = {
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      destination: null,
      selectedGuest: this.selectedGuestCount,
      hotels: [],
      hotelsRes: [],
    };
    console.log("setData",setData)
    this.dataService.setSharedData(setData);
    this.dataService.setBookingData(this.propertyDetails);
    this.router.navigate(['/confirm-booking']);
  }

  getExclusiveTaxLength(obj: any): number {
    return Object.keys(obj).length;
  }


  currentUrl: string = window.location.href;

  toggleShareMenu() {
    this.showShareMenu = !this.showShareMenu;
  }

  share(platform: string) {
    const encodedUrl = encodeURIComponent(window.location.href);
    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://api.whatsapp.com/send?text=${encodedUrl}`;
        break;
      case 'instagram':
        const instagramLink = `https://instagram.com/direct/new/`;
        shareLink = `${instagramLink}?text=${this.currentUrl}`;
        break;
    }

    window.open(shareLink, '_blank');
  }

  getCollectionStyles(collectionId: number | number[] | null | undefined): { [klass: string]: any } {
    if (Array.isArray(collectionId) && collectionId.includes(1)) {
      return { background: '#c4b385', color: '#584139' };
    }

    if (collectionId === 1) {
      return { background: '#c4b385', color: '#584139' };
    }

    return {};
  }

  isMasterpiece(collectionId: number | number[] | null | undefined): boolean {
    if (Array.isArray(collectionId)) {
      return collectionId.includes(1);
    }
    return collectionId === 1;
  }

  async dateRange(event: any){
    this.checkInDate = event.checkInDate;
    this.checkOutDate = event.checkOutDate;
    this.isMasterpiece(this.propertyDetails.collections);
 
    if (this.checkInDate != 'Check in' || this.checkOutDate != 'Check out') {
      const differenceInDays = moment(this.checkOutDate).diff(moment(this.checkInDate), 'days');
      if (differenceInDays <= 1)  {
        this.propertyDetails = {}
        this.toastr.error('Minimum 2 nights stay is required');
      }
      else await this.changeHotelDetails(this.id);
    }
  }

  async updateGuest(event: any){
    this.totalSelectedGuest = event.number_adults + event.number_children;
    this.selectedGuestCount = { number_adults: event.number_adults, number_children: event.number_children };
    this.isMasterpiece(this.propertyDetails.collections)

    if ( this.checkInDate != 'Check in' || this.checkOutDate != 'Check out' ) {
      const differenceInDays = moment(this.checkOutDate).diff( moment(this.checkInDate), 'days' );
      if (differenceInDays <= 1) {
        this.propertyDetails = {}
        this.toastr.error('Minimum 2 nights stay is required');
      }
      else await this.changeHotelDetails(this.id);
    }
  }

  calculateFinalPrice(): number {
    if ( this.propertyDetails?.extra_person_charges_per_night && this.propertyDetails?.price_per_night)
        return ( this.propertyDetails?.price_per_night - this.propertyDetails.extra_person_charges_per_night );
    return this.propertyDetails?.price_per_night || 0;
  }

  formatDateRange(checkInDate: string, checkOutDate: string): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
  
    const checkIn = new Date(checkInDate).toLocaleDateString('en-US', options);
    const checkOut = new Date(checkOutDate).toLocaleDateString('en-US', options);
  
    return `${checkIn} - ${checkOut}`;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;

    if (windowWidth > 991) this.resetWhatsappBtnPosition();
    else this.adjustWhatsappButton();
  }
  
  adjustWhatsappButton(){
    const pricing = document.querySelector('.mobile-pricing-summary') as HTMLElement;
    const whatsappBtn = document.querySelector('#wa_btn-content') as HTMLElement;
    if (pricing && whatsappBtn) {
      const pricingHeight = pricing.offsetHeight;
      whatsappBtn.style.bottom = pricingHeight + 20 + 'px';
      whatsappBtn.style.position = 'fixed';
      whatsappBtn.style.right = '20px';
    }
  }

  resetWhatsappBtnPosition(){
    const whatsappBtn = document.querySelector('#wa_btn-content') as HTMLElement;
    if (whatsappBtn) {
      whatsappBtn.style.bottom = 0 + 'px';
      whatsappBtn.style.position = 'relative';
      whatsappBtn.style.right = '0';
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(window.innerWidth <= 992){
      const footer = document.querySelector('app-footer') as HTMLElement;
      const pricingSummary = document.querySelector('.mobile-pricing-summary') as HTMLElement;
      if (!footer || !pricingSummary)  return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const threshold = 50;
      if (footerRect.top <= (windowHeight - threshold)) {
        if (pricingSummary.style.display !== 'none') {
          pricingSummary.style.setProperty('display', 'none', 'important');
          this.scrolledToFooter = true;
          this.adjustWhatsappButton();
        }
      } else if (footerRect.top > (windowHeight + threshold)) {
        if (pricingSummary.style.display !== 'block') {
          pricingSummary.style.setProperty('display', 'block', 'important');
          this.scrolledToFooter = false;
          this.adjustWhatsappButton();
        }
      }
    }
  }

  scrollToFooter() {
    const footer = document.querySelector('app-dont-warry-section') as HTMLElement;
    if (footer) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    const clickedInsideShare = target.closest('.share-buttons') || target.closest('.share-toggle');

    if (!clickedInsideShare) {
      this.showShareMenu = false;
    }
  }

  get isLargeScreen(): boolean {
    return window.innerWidth > 600;
  }

  openWhatsAppReservation() {
    const propertyName = this.propertyDetails?.internal_name || 'Property';
    const checkIn = this.checkInDate ? moment(this.checkInDate).format('DD MMM YYYY') : 'Not selected';
    const checkOut = this.checkOutDate ? moment(this.checkOutDate).format('DD MMM YYYY') : 'Not selected';
    const guests = this.selectedGuestCount ? 
      `${this.selectedGuestCount.number_adults} Adults, ${this.selectedGuestCount.number_children} Children` : 
      'Not selected';
    const price = this.propertyDetails?.price_per_night ? 
      `Rs. ${this.propertyDetails.price_per_night} per night` : 
      'Price not available';
    const totalPrice = this.propertyDetails?.totalprice_inclusive_all ? 
      `Rs. ${this.propertyDetails.totalprice_inclusive_all}` : 
      'Total price not available';
    const location = this.propertyDetails?.city && this.propertyDetails?.state ? 
      `${this.propertyDetails.city}, ${this.propertyDetails.state}` : 
      'Location not available';
    
    const message = `Hello, I would like to make a booking for:\n\n` +
      `Property: ${propertyName}\n` +
      `Location: ${location}\n` +
      `Check-in: ${checkIn}\n` +
      `Check-out: ${checkOut}\n` +
      `Guests: ${guests}\n` +
      `Price: ${price}\n` +
      `Total: ${totalPrice}`;
    
    const whatsAppNumber = '919226934609';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsAppNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
}
import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import { Constants } from 'src/app/constants/constants';
import { ConfigService } from 'src/app/services/config.service';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() public headerName: string = 'default';
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Output() checkInOut: EventEmitter<any> = new EventEmitter();
  @Output() checkGuest: EventEmitter<any> = new EventEmitter();
  @Output() checkAvailability: EventEmitter<any> = new EventEmitter();

  currentDevice: string = '';
  filterModalWith: string = '';
  selectedDestination: { id: number; name: string } = {
    id: 1,
    name: 'Goa',
  };
  checkInDate: string = 'Check in';
  checkOutDate: string = 'Check out';
  selectedGuestCount: {number_adults: number, number_children: number} = {number_adults: 2, number_children: 0};
  totalSelectedGuest: number = 0;
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
  overlayVisible: boolean = false;

  showContent: boolean = false
  isDescription: boolean = false;

  constructor(
    private toastr: ToastrService,
    private dataService: DataService,
    private mms: ModalManagerService,
    private config: ConfigService,
    private adminService: AdminService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.searchDestination();
  }

  ngOnInit(): void {
    this.currentDevice = this.config.getDevice();
    this.deviceCheck();
    const data = this.dataService.getSharedData();
    if (data) {
      this.selectedDestination = data.destination || {
        id: 1,
        name: 'Goa',
      };
      this.checkInDate = data.checkInDate || 'Check in';
      this.checkOutDate = data.checkOutDate || 'Check out';
      this.handleDefaultValues();
      this.selectedGuestCount.number_adults = data.selectedGuest || 0;
      this.totalSelectedGuest = this.selectedGuestCount?.number_adults + this.selectedGuestCount?.number_children;
    }
    const currentUrl = this.router.url;
    if (currentUrl.includes('stay/all'))  this.isDescription = true;
  }

  private handleDefaultValues() {
    this.checkInDate = this.checkInDate === 'Check in' ? moment().format('DD MMM YYYY') : this.checkInDate;
    this.checkOutDate = this.checkOutDate === 'Check out' ? moment().add(2, 'days').format('DD MMM YYYY') : this.checkOutDate;
  }

  private searchDestination() {
    this.adminService.getDestinations().subscribe((res: any) => {
      const queryParams: Params = this._activatedRoute.snapshot.queryParams;
      this.pagePayload = Object.assign(this.pagePayload, queryParams);
      this.checkInDate = this.pagePayload.check_in_date || 'Check in';
      this.checkOutDate = this.pagePayload.check_out_date || 'Check out';
      this.handleDefaultValues();
      this.selectedGuestCount = {
        number_adults: isNaN(Number(this.pagePayload.number_adults)) ? 0 : Number(this.pagePayload.number_adults),
        number_children: isNaN(Number(this.pagePayload.number_children)) ? 0 : Number(this.pagePayload.number_children),
      };
      this.totalSelectedGuest = this.selectedGuestCount?.number_adults + this.selectedGuestCount?.number_children;
      const destinationId = isNaN(Number(this.pagePayload.destination)) ? 0 : Number(this.pagePayload.destination);
      const selectedDestination = res.find((destination: any) => destination.id === destinationId);
      this.selectedDestination = selectedDestination || { id: 1, name: 'Goa' };
    })
  }

  sendDestination() {
    var data: any = {
      modalWidth: this.filterModalWith,
      destination: this.selectedDestination,
    };
    this.mms
      .openGuestSearchModal({ view: 'destination', title: '', data: data })
      .subscribe((res: any) => {
        this.selectedDestination = res;
      });
  }

  deviceCheck() {
    if (this.currentDevice == Constants.deviceDimension.mobile) {
      this.filterModalWith = '90%';
    } else if (this.currentDevice == Constants.deviceDimension.tablet) {
      this.filterModalWith = '80%';
    } else if (this.currentDevice == Constants.deviceDimension.desktop) {
      this.filterModalWith = '50%';
    }
  }

  parseDate(inputDate: any, defaultDate: moment.Moment): moment.Moment {
    const date = moment(inputDate);
    return date.isValid() ? date : defaultDate;
  }
  sendCheckInOut() {
    var data: any = {
      modalWidth: this.filterModalWith,
      checkInDate:
        this.checkInDate !== 'Check in' && this.checkInDate
          ? this.parseDate(this.checkInDate, moment())
          : moment(),
      checkOutDate:
        this.checkOutDate !== 'Check out' && this.checkOutDate
          ? this.parseDate(this.checkOutDate, moment().add(2, 'days'))
          : moment().add(2, 'days'),
    };
    console.log('data', data);
    this.mms
      .openGuestSearchModal({ view: 'checkInOut', title: '', data: data })
      .subscribe((res: any) => {
        this.checkInDate = res.startDate;
        this.checkOutDate = res.endDate;
      });
  }
  sendGuest() {
    this.checkGuest.emit('Some value to send to the parent');
  }

  toggleMenu() {
    const isMobile = window.innerWidth <= 992;
  	if (isMobile) {
			this.overlayVisible = true;
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
    else this.mms.topMenuModal({ id: 0 }).subscribe((res: any) => {});
  }
  
  openGuestModal() {
    this.dataService.filterContent.next({});
  }

  onCaclulate() {
    var errorCount = 0;
    // if (this.selectedDestination.id == 0) {
    //   this.toastr.error("Select Destination")
    //   errorCount++;
    // }

    if (this.checkInDate != 'Check in' || this.checkOutDate != 'Check out') {
      const differenceInDays = moment(this.checkOutDate).diff(
        moment(this.checkInDate),
        'days'
      );
      if (differenceInDays <= 1) {
        this.toastr.error('Minimum 2 nights stay is required');
        errorCount++;
      }
    }

    if (errorCount) {
      return;
    }
    if (this.selectedDestination.id === 0) {
      this.selectedDestination.id = 1;
    }
    const data = {
      checkInDate: this.checkInDate != 'Check in' ? this.checkInDate : null,
      checkOutDate: this.checkOutDate != 'Check out' ? this.checkOutDate : null,
      destination: this.selectedDestination,
      selectedGuest: this.selectedGuestCount,
    };
    this.checkAvailability.emit(data);
    this.showContent = false;
  }

  dateRange(event: any){
    this.checkInDate = event.checkInDate
    this.checkOutDate = event.checkOutDate
  }

  showContentValue(){
    this.showContent = !this.showContent;
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const insideShowContent = clickedElement.closest('.show-content');
    const insideCardBorder = clickedElement.closest('.card-border');

    if (!insideShowContent && !insideCardBorder) this.showContent = false;
  }

  updateDateRange(event: any){
    this.checkInDate = event.checkInDate;
    this.checkOutDate = event.checkOutDate;
  }
}

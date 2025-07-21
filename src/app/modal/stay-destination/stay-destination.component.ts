import { Component, Input, Inject, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef, Optional, SimpleChange, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { AdminService } from 'src/app/services/admin.service';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { ApiService } from "src/app/services/http/api.service";
import moment from "moment";
import { DateRange, TimePeriod } from "ngx-daterangepicker-material/daterangepicker.component";
import { NgxSpinnerService } from "ngx-spinner";
import { KeyValue } from "@angular/common";

dayjs.extend(isoWeek);
@Component({
  selector: 'app-stay-destination',
  templateUrl: './stay-destination.component.html',
  styleUrls: ['./stay-destination.component.scss']
})
export class StayDestinationComponent implements OnDestroy {
  @ViewChild('dateRangePicker', { static: true }) dateRangePicker: ElementRef;
  previousMonth: string;
  observer: MutationObserver;
  @Input() name: any = {};
  filterAminities: Record<string, { id: number; name: string; order?: number }[]> = {};
  filterPropertyType: any = [];
  @Input() public menuName: string = 'priceDetails';
  @Output() checkInOut: EventEmitter<any> = new EventEmitter();
  @Output() selectedTotalGuests: EventEmitter<void> = new EventEmitter<void>();
  @Output() updatedDateRange: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeMenu: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(DaterangepickerComponent) datePicker: DaterangepickerComponent;
  selected: { startDate: dayjs.Dayjs, endDate: dayjs.Dayjs } = {
    startDate: dayjs(), // Default start date (today)
    endDate: dayjs().add(1, 'days') // Default end date (tomorrow)
  };
  selectedBedroom: string = "Any";
  selectedAminities: string = '';
  adultCount: number = 2;
  childCount: number = 0;
  alwaysShowCalendars: boolean;
  maxAdultCount: number = 8;
  maxChildCount: number = 2;
  petCount: number = 0;
  minValue: number = 999;
  maxValue: number = 49999;
  options: Options = {
    floor: 999,
    ceil: 50000,
    step: 500,
    animate: true,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "Rs " + value;
        case LabelType.High:
          return "Rs " + value;
        default:
          return "";
      }
    }
  };
  bedroomsArr = ['Any', '1', '2', '3', '4', '5', '6', '7', '8+'];
  ratingArr = ['Any', '4+', '3+', '2+'];
  daysArr = ['+1 Day', '+2 Days', '+3 Days', '+7 Days'];
  essentialsArr = ['Wifi', 'AC', 'Kitchen', 'Dryer', 'Washing Machine', 'Iron'];
  featuresArr = ['Pool', 'Hot Tub', 'Parking', 'EV Charger', 'BBQ Gril', 'Breakfast', 'Gym', 'Smoking Allowed'];
  public notSureCheck: boolean = false;
  destination: string = '';
  occupied: string[] = [];
  checkInOutSelected = { startDate: "", endDate: "", close: false }
  destinationsALl: any;
  minDate: dayjs.Dayjs = dayjs().subtract(0, 'days');
  selectedAmenities: number[] = [];
  selectedPropertyType: number[] = [];
  id: number = 0;
  propertySlug: string = '';
  isLoadingCalendar: boolean = false;
  lastLoadedPropertyId: number = 0;
  aminities: any[] = [
    {
      id: 16,
      name:'Pool', 
      order: 1
    },
    {
      id: 17,
      name:'Parking', 
      order: 2
    },
    {
      id: 18,
      name:'Kitchen', 
      order: 3
    },
    {
      id: 19,
      name:'Conceirge', 
      order: 4
    },
    {
      id: 20,
      name:'Gym', 
      order: 5
    },
    {
      id: 21,
      name:'EV Charger', 
      order: 6
    }
  ];

  constructor(
    private adminService: AdminService,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef,
    @Optional() private _mdr: MatDialogRef<StayDestinationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.alwaysShowCalendars = true;
    this.name = data;
  }
  ngOnInit() {
    // Force hide any existing spinner on component init
    this.spinner.hide();
    this.isLoadingCalendar = false;
    
    if (this.name?.view === 'destination') {
      this.adminService.getDestinations().subscribe((res: any) => {
        this.destinationsALl = res;
      })
    }
    this.filterAminities = this.name.filterAminities || [];
    this.filterPropertyType = this.name.filterPropertyType || [];
    this.filterAminities['Aminities'] = this.aminities;
  }

  ngOnChanges(changes: {name: SimpleChange}): void {
    if(changes && changes.name && changes.name.currentValue){
      this.name = changes.name.currentValue;
      if (this.name?.view === 'guests') {
        this.menuName = 'guests';
        if (this.name.data.selectedGuest) {
          this.adultCount = this.name.data.selectedGuest.number_adults;
          this.childCount = this.name.data.selectedGuest.number_children;
          if (this.name.data.max_adults_allowed > 0) this.maxAdultCount = this.name.data.max_adults_allowed;
          this.maxChildCount = this.name.data.max_children_allowed;
        }
      } else if (this.name?.view === 'checkInOut') {
        // Force hide any existing spinner when calendar view opens
        this.spinner.hide();
        this.isLoadingCalendar = false;
        
        this.menuName = 'checkInOut';
        this.selected = {
          startDate: dayjs(this.name.data.checkInDate),
          endDate: dayjs(this.name.data.checkOutDate)
        }
        this.id = this.name.data.property_id;
        this.propertySlug = this.name.data.property_slug || this.name.data.slug || '';
        
        console.log('Property info received:', {
          id: this.id,
          slug: this.propertySlug,
          data: this.name.data
        });
        
        // Only load calendar data if property has changed and we have a valid slug
        if(this.propertySlug && this.id !== this.lastLoadedPropertyId && !this.isLoadingCalendar) {
          this.lastLoadedPropertyId = this.id;
          this.handleMonthChange(this.name.data.checkInDate);
        } else if (!this.propertySlug) {
          console.error('No property slug available for calendar loading:', this.name.data);
        }
      } else if (this.name?.view === 'destination') {
        this.menuName = 'Destination';
        this.destination = this.name.data.destination
      } else if (this.menuName === 'priceDetails') {
        if (this.name.filter) {
          this.minValue = this.name.filter.minPrice;
          this.maxValue = this.name.filter.maxPrice;
          this.selectedBedroom = this.name.filter.bedrooms;
          this.selectedAmenities = this.name.filter.amenities;
          this.selectedPropertyType = this.name.filter.propertyType;
        }
        this.filterAminities = this.name.filterAminities || [];
        this.filterPropertyType = this.name.filterPropertyType || [];
      }
    }
  }

  customSort = (a: KeyValue<string, any[]>, b: KeyValue<string, any[]>) => {
    if (a.key === 'Aminities') return -1;
    if (b.key === 'Aminities') return 1;
    return 0;
  };

  CloseDialog() {
    // Force hide spinner when closing dialog
    this.spinner.hide();
    this.isLoadingCalendar = false;
    
    if (this.name?.view === 'destination') {
      this._mdr.close(this.destination)
    } else if (this.name?.view === 'checkInOut') {
      const checkInDate = this.name.data.checkInDate ? moment(this.name.data.checkInDate, "YYYY-MM-DD") : null;
      const checkOutDate = this.name.data.checkOutDate ? moment(this.name.data.checkOutDate, "YYYY-MM-DD") : null;

      this.checkInOutSelected = {
          startDate: checkInDate && checkInDate.isValid() ? checkInDate.format('YYYY-MM-DD') : 'Check in',
          endDate: checkOutDate && checkOutDate.isValid() ? checkOutDate.format('YYYY-MM-DD') : 'Check out',
          close: true
      };
      this.closeMenu.emit();
    } else if (this.menuName === 'priceDetails') {
      var filterData =
      {
        min: this.minValue,
        max: this.maxValue,
        bedrooms: this.selectedBedroom,
        aminities: this.selectedAmenities,
        propertyType: this.selectedPropertyType,
        type: 0
      }
      this._mdr.close(filterData)
    } else if (this.name?.view === 'guests') { 
      const totalGuest: any = {
        number_adults: this.name.data.selectedGuest.number_adults,
        number_children: this.name.data.selectedGuest.number_children
      }
      this.selectedTotalGuests.emit(totalGuest)
    }
  }

  onPriceChange(changeContext: any): void {
    this.minValue = changeContext.value;
    this.maxValue = changeContext.highValue;
  }

  public notSureEvent(event: any) {
    event?.target?.checked ? this.notSureCheck = true : this.notSureCheck = false;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  onSelectBedroom(value: string) {
    this.selectedBedroom = value;
  }
  onSelectAminities(value: string) {
    this.selectedAminities = value;
  }
  filterApply() {
    var filterData =
    {
      min: this.minValue,
      max: this.maxValue,
      bedrooms: this.selectedBedroom,
      aminities: this.selectedAmenities,
      propertyType: this.selectedPropertyType,
      type: 1
    }
    this._mdr.close(filterData)
  }

  choosedDate(event: any) {
    // Force hide spinner after date selection
    this.spinner.hide();
    this.isLoadingCalendar = false;
    
    var checkInOutSelected =
    {
      startDate: event.startDate.format('DD MMM YYYY'),
      endDate: event.endDate.format('DD MMM YYYY'),
      close: false
    }
    // this._mdr.close(checkInOutSelected)
    this.updatedDateRange.emit(checkInOutSelected);
  }

  selectDestinations(destination: any) {
    this._mdr.close(destination)
  }

  isInvalidDate = (m: dayjs.Dayjs) => {
    const dateStr = m.format('YYYY-MM-DD');
    
    // Simple check: if date is in occupied array, it's unavailable
    const isUnavailable = this.occupied?.includes(dateStr);
    
    if (isUnavailable) {
      return true; // Disable this date
    }
    
    return false; // Date is available for selection
  };

  selectGuests() {
    const totalGuest: any = {
      number_adults: this.adultCount,
      number_children: this.childCount
    }
    // var totalGuest = this.adultCount + this.childCount;
    this.selectedTotalGuests.emit(totalGuest)
  }

  incrementGuests(type: string) {
    if (type === 'adult') {
      if (this.name?.from === 'des') {
        if (this.adultCount < this.maxAdultCount) {
          this.adultCount++;
        } else {
        }
      } else {
        this.adultCount++;
      }
    } else if (type === 'child') {
      if (this.name?.from === 'des') {
        if (this.childCount < this.maxChildCount) {
          this.childCount++;
        } else {
        }
      } else {
        this.childCount++;
      }
    } else if (type === 'pet') {
      this.petCount++;
    }
  }

  decrementGuests(type: string) {
    if (type === 'adult' && this.adultCount > 0) {
      if (this.adultCount <= 1) return;
      this.adultCount--;
    } else if (type === 'child' && this.childCount > 0) {
      this.childCount--;
    } else if (type === 'pet' && this.petCount > 0) {
      this.petCount--;
    }
  }

  toggleAmenitySelection(amenityId: number) {
    const index = this.selectedAmenities.indexOf(amenityId);
    if (index === -1) {
      this.selectedAmenities.push(amenityId);
    } else {
      this.selectedAmenities.splice(index, 1);
    }
  }

  isSelected(amenityId: number): boolean {
    return this.selectedAmenities.includes(amenityId);
  }

  togglePropertyTypeSelection(amenityId: number) {
    const index = this.selectedPropertyType.indexOf(amenityId);
    if (index === -1) {
      this.selectedPropertyType.push(amenityId);
    } else {
      this.selectedPropertyType.splice(index, 1);
    }
  }

  isPropertyTypeSelected(amenityId: number): boolean {
    return this.selectedPropertyType.includes(amenityId);
  }

  rangeClicked(range: DateRange): void {
    // eslint-disable-next-line no-console
    console.log('[rangeClicked] range is : ', range);
  }

  datesUpdated(range: TimePeriod): void {
    // eslint-disable-next-line no-console
    console.log('[datesUpdated] range is : ', range);
  }

  // ngAfterViewInit() {
  //   this.previousMonth = this.getMonthText();
  //   this.setupMonthChangeObserver();
  // }

  // ngAfterViewChecked() {
  //   const dateRange:any = this.dateRangePicker;
  //   if (!this.observer) {
  //     this.setupMonthChangeObserver();
  //   }
  // }

  // setupMonthChangeObserver() {
  //   const dateRange: any = this.dateRangePicker;
  //   const monthElement = dateRange.el.nativeElement.querySelector('.month');
  //   if (monthElement) {
  //     this.observer = new MutationObserver(() => {
  //       const newMonth = this.getMonthText();
  //       if (newMonth && newMonth !== this.previousMonth) {
  //         this.handleMonthChange(newMonth);
  //         this.previousMonth = newMonth;
  //       }
  //     });
  //     this.observer.observe(monthElement, {
  //       childList: true,
  //       characterData: true,
  //       subtree: true
  //     });
  //   }
  // }

  // getMonthText(): string {
  //   const dateRange: any = this.dateRangePicker;
  //   console.log(dateRange.isInvalidDate)
  //   const monthElement = dateRange.el.nativeElement.querySelector('.month');
  //   return monthElement ? monthElement.textContent.trim() : '';
  // }

  async handleMonthChange(newMonth: string) {
    if (this.propertySlug && !this.isLoadingCalendar) {
      this.isLoadingCalendar = true;
      this.occupied = [];
      this.spinner.show();
      
      console.log('Loading calendar availability for:', this.propertySlug);
      
      // Timeout safeguard
      const timeoutId = setTimeout(() => {
        console.warn('Calendar loading timeout');
        this.spinner.hide();
        this.isLoadingCalendar = false;
        this.cd.detectChanges();
      }, 5000);
      
      let payload: any = {};
      payload.propertyId = this.propertySlug;
      
      this.apiService.httpPost('/ext/calendarAvailability', payload).subscribe({
        next: (res: any) => {
          clearTimeout(timeoutId);
          
          if (res && res.property) {
            this.processCalendarData(res.property);
          }
          
          // Update calendar
          this.spinner.hide();
          this.isLoadingCalendar = false;
          
          try {
            if (this.datePicker && this.datePicker.updateCalendars) {
              this.datePicker.updateCalendars();
            }
          } catch (error) {
            console.error('Error updating calendar:', error);
          }
          
          this.cd.detectChanges();
        },
        error: (error: any) => {
          clearTimeout(timeoutId);
          console.error('Calendar API error:', error);
          this.spinner.hide();
          this.isLoadingCalendar = false;
          this.cd.detectChanges();
        }
      });
    }
  }

  processCalendarData(calendarData: any) {
    // Clear existing occupied dates
    this.occupied = [];
    
    for (const [date, status] of Object.entries(calendarData)) {
      if (status === 0) {
        // Status 0: Internal stay days - completely unavailable
        this.occupied.push(date);
      } else if (status === 2) {
        // Status 2: Check-in dates - unavailable for new check-ins
        this.occupied.push(date);
      }
      // Status 1: Available dates (including check-out dates) - not added to occupied
    }
    
    console.log(`Processed ${Object.keys(calendarData).length} dates, ${this.occupied.length} unavailable`);
  }
  onClearAllClick(){}

  ngOnDestroy(): void {
    // Force hide spinner and cleanup on component destroy
    this.spinner.hide();
    this.occupied = [];
    this.isLoadingCalendar = false;
    this.lastLoadedPropertyId = 0;
    this.selectedAmenities = [];
    this.selectedPropertyType = [];
    this.id = 0;
    this.propertySlug = '';
  }
}

import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import moment from 'moment';

@Component({
    selector: 'app-menu-content',
    templateUrl: './menu-content.component.html',
    styleUrls: ['./menu-content.component.scss']
})
export class MenuContentComponent {
    @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
    @Output() dateRange: EventEmitter<any> = new EventEmitter<any>();
    @Output() updateGuest: EventEmitter<any> = new EventEmitter<any>();

    @Input() viewType: 'checkInOut' | 'guests' = 'checkInOut';
    @Input() checkInDate: string = 'Check in';
    @Input() checkOutDate: string = 'Check out';
    @Input() selectedGuest: { number_adults: number, number_children: number } = { number_adults: 2, number_children: 0 };
    @Input() isSummary: boolean = false;
    @Input() isDescription: boolean = false;
    @Input() propertyId: number = 0;
    @Input() propertyDetails: any;
    @Input() isMobile: boolean = false;
    name: any = {};
  
    totalGuests: number = this.selectedGuest.number_adults + this.selectedGuest.number_children;

    ngAfterViewInit(): void {
        this.checkInDate = this.checkInDate === 'Check in' ? moment().format('DD MMM YYYY') : this.checkInDate;
        this.checkOutDate = this.checkOutDate === 'Check out' ? moment().add(2, 'days').format('DD MMM YYYY') : this.checkOutDate;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['checkInDate'])  
            this.checkInDate = changes['checkInDate'].currentValue || moment().format('DD MMM YYYY');
        if (changes['checkOutDate'])  
            this.checkOutDate = changes['checkOutDate'].currentValue || moment().add(2, 'days').format('DD MMM YYYY');
        this.totalGuests = this.selectedGuest.number_adults + this.selectedGuest.number_children;
    }

    updateGuests(event: any) {
        if (typeof this.selectedGuest !== 'object' || this.selectedGuest === null) 
            this.selectedGuest = { number_adults: 0, number_children: 0 };
    
        if (event.number_adults !== undefined) this.selectedGuest.number_adults = event.number_adults;
        if (event.number_children !== undefined) this.selectedGuest.number_children = event.number_children;
    
        this.totalGuests = this.selectedGuest.number_adults + this.selectedGuest.number_children;
    
        this.updateGuest.emit(this.selectedGuest);
        this.closeMenu();
    }

    updateDateRange(event: any) {
        this.checkInDate = this.checkInDate !== 'Check in' && event.startDate
            ? this.parseDate(event.startDate, moment()).format('DD MMM YYYY')
            : moment().format('DD MMM YYYY');
    
        this.checkOutDate = this.checkOutDate !== 'Check out' && event.endDate
            ? this.parseDate(event.endDate, moment()).format('DD MMM YYYY')
            : moment().add(2, 'days').format('DD MMM YYYY');
        this.dateRange.emit({checkInDate: this.checkInDate, checkOutDate: this.checkOutDate})
        this.closeMenu();
    }
    
    parseDate(inputDate: any, defaultDate: moment.Moment): moment.Moment {
        const date = moment(inputDate);
        return date.isValid() ? date : defaultDate;
    }

    closeMenu(){
        this.menuTrigger.closeMenu();
    }

    isMasterpiece(collectionId: number | number[] | null | undefined): boolean {
        if (Array.isArray(collectionId)) {
          return collectionId.includes(1); // Check if 'Masterpiece' (ID 1) is in the array
        }
        return collectionId === 1; // Check if it's a single value
    }

    setNameData(){
        if(this.viewType === 'checkInOut'){
            this.name = {
                data : {
                    checkInDate:  this.parseDate(this.checkInDate, moment()).format('YYYY-MM-DD'),
                    checkOutDate: this.parseDate(this.checkOutDate, moment()).format('YYYY-MM-DD'),
                    property_id: this.propertyId,
                    from: 'discription'
                },
                view: this.viewType
            }
        }
        else if(this.viewType === 'guests'){
            this.name = {
                view: this.viewType,
                from: 'des',
                data : {
                    selectedGuest : this.selectedGuest,
                    max_adults_allowed: this.propertyDetails?.max_adults_allowed || 8,
                    max_children_allowed: this.propertyDetails?.max_adults_allowed ? this.propertyDetails?.max_children_allowed : 2,
                },
            }
        }
    }

    formatDateRange(checkInDate: string, checkOutDate: string): string {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
      
        const checkIn = new Date(checkInDate).toLocaleDateString('en-US', options);
        const checkOut = new Date(checkOutDate).toLocaleDateString('en-US', options);
      
        return `${checkIn} - ${checkOut}`;
    }
}

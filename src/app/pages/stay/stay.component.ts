import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StayDestinationComponent } from '../../modal/stay-destination/stay-destination.component';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/http/api.service';
import moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from '@angular/common';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Util } from 'src/app/shared/utilities';

@Component({
  selector: 'app-stay',
  templateUrl: './stay.component.html',
  styleUrls: ['./stay.component.scss']
})
export class StayComponent {
  menuName: string = 'Destination';
  viewIndex: number = 0;

  @Input() public headerName: string = 'menus';
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Output() checkInOut: EventEmitter<any> = new EventEmitter();

  showDontWorrySection: boolean = true;
  aminitiesList: any = [
    {
      id: 0,
      name: 'All',
      img: '../../../assets/images/select.png',
      active: true
    },
  ];
  defaultAminities: any;
  filteredProperties: any;

  propertyImagesArr: any = [
    'Frame 323.png', 'property-ex-1.png', 'property-ex-2.png', 'property-ex-3.png'
  ];
  pagePayload: { check_in_date: string, check_out_date: string, destination: number, number_adults: string, number_children: string } = { check_in_date: "", check_out_date: "", destination: 0, number_adults: "", number_children: "" };

  name: string = "";
  filterAminities: any = [];
  filterPropertType: any = [];
  hotelLists: any = [];
  collections: any = [];
  hotelsRes: any = [];
  selectedDestination: { id: number, name: string, } = { id: 0, name: 'Destination' };
  checkInDate: string = "Check in";
  checkOutDate: string = "Check out";
  selectedGuest: string = "";
  filter: { maxPrice: Number, minPrice: Number, bedrooms: any, amenities: number[], propertyType: number[] } = { minPrice: 999, maxPrice: 50000, bedrooms: 'Any', amenities: [], propertyType: [] };
  private matDialogRef: MatDialogRef<StayDestinationComponent>;
  private readonly _destroyed = new Subject<void>();
  currentStayType: string = "all";

  hasLoading: boolean = false;
  skeletonObject = new Array(20).fill(0).map((_, i) => i + 1);

  private susbcription: Subscription = new Subscription();


  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private dataService: DataService,
    private matDialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location) {

    this.defaultAminities = JSON.parse(JSON.stringify(this.aminitiesList));
  }

  async ngOnInit() {
    await this.getSettingData();
    this._activatedRoute.params
      .pipe(takeUntil(this._destroyed))
      .subscribe(async ({ stayType }) => {
        this.currentStayType = stayType;
        const availabilityParams = this.getUrlParams();
        const pagePayload = this.buildAvailabilityPayload(availabilityParams);
        await this.checkAvailability(pagePayload);
      });
      this.dataService.filterContent.subscribe(() => this.toggleFilter())
  }

  private getUrlParams() {
    const queryParams = this._activatedRoute.snapshot.queryParams;
    this.pagePayload = Object.assign(this.pagePayload, {
      check_in_date: queryParams['check_in_date'],
      check_out_date: queryParams['check_out_date'],
      destination: queryParams['destination'],
      number_adults: isNaN(Number(queryParams['number_adults'])) ? 0 : Number(queryParams['number_adults']),
      number_children: isNaN(Number(queryParams['number_children'])) ? 0 : Number(queryParams['number_children']),
    });
    const availabilityParams = {
      destination: {
        id: this.pagePayload.destination,
        name: ''
      },
      checkInDate: this.pagePayload.check_in_date,
      checkOutDate: this.pagePayload.check_out_date,
      selectedGuest: {
        number_adults: this.pagePayload.number_adults,
        number_children: this.pagePayload.number_children
      }
    }
    return availabilityParams;
  }

  private buildAvailabilityPayload(data: any): any {
    const payload: any = {
      destination: data?.destination?.id || 1
    };

    if (data?.checkInDate) {
      payload['check_in_date'] = moment(data.checkInDate).format('YYYY-MM-DD');
    }

    if (data?.checkOutDate) {
      payload['check_out_date'] = moment(data.checkOutDate).format('YYYY-MM-DD');
    }

    if (data?.selectedGuest?.number_adults !== undefined) {
      payload['number_adults'] = data.selectedGuest.number_adults;
    }

    if (data?.selectedGuest?.number_children !== undefined) {
      payload['number_children'] = data.selectedGuest.number_children;
    }

    if (this.currentStayType !== "all") {
      payload['collection'] = this.currentStayType;
    }

    return payload;
  }

  async searchProperity(data: any) {
    const pagePayload = this.buildAvailabilityPayload(data);
    this.router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: Util.purifyObject(pagePayload),
      queryParamsHandling: 'merge', // or 'preserve'
      replaceUrl: true // optional: replaces URL without pushing to history
    });
    await this.checkAvailability(pagePayload);
  }

  // viewHotelDetails(slug: string) {
  //   const queryParams: Params = this._activatedRoute.snapshot.queryParams;
  //   this.router.navigate(['/stay-description', slug], { queryParams });
  // }

  viewHotelDetails(slug: string) {
    const queryParams: Params = this._activatedRoute.snapshot.queryParams;
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `/stay-description/${slug}${queryString ? '?' + queryString : ''}`;
    window.open(url, '_blank');
}

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  onSelectAminities(index: number) {
    this.viewIndex = index;
    let itemIndex = this.aminitiesList.findIndex((item: any) => item.active === true);
    this.aminitiesList[itemIndex].active = false;
    this.aminitiesList[index].active = true;
  }

  getDestination(evt: any) {
    this.matDialogRef = this.matDialog.open(StayDestinationComponent, {
      disableClose: true
    });
  }

  getCheckInOut(evt: any) {
    this.menuName = 'checkInOut';
    this.matDialogRef = this.matDialog.open(StayDestinationComponent, {
      disableClose: true
    });
  }

  toggleFilter() {
    this.matDialogRef = this.matDialog.open(StayDestinationComponent, {
      disableClose: true,
      data: { "filter": this.filter, "filterAminities": this.filterAminities, "filterPropertyType": this.filterPropertType },
      panelClass: 'custom-overlay-panel'
    });
    this.matDialogRef.componentInstance.menuName = 'priceDetails';
    this.matDialogRef.componentInstance.name = {
      filterAminities : this.filterAminities,
      filterPropertyType : this.filterPropertType
    }
    this.matDialogRef.afterClosed().subscribe((res: any) => {
      this.spinner.show()
      this.filter.minPrice = res.min
      this.filter.maxPrice = res.max
      this.filter.bedrooms = res.bedrooms
      this.filter.amenities = res.aminities
      this.filter.propertyType = res.propertyType
      if (res.type) {
        this.filterProperties()
      } else {
        this.spinner.hide()
      }
    })
    // this.checkInOut.emit('Some value to send to the parent');

  }
  /** Get Setting Data */
  async getSettingData() {
    this.apiService.httpGet('/properties/settings').subscribe((res: any) => {
      if (res) {
        this.collections = res.collections;
        this.filterAminities = res.amenities;
        this.filterPropertType = res.property_types;
        this.pushCollectionsToAminitiesList(res.collections);
      }
    })
  }
  async pushCollectionsToAminitiesList(collections: any[]) {
    collections.forEach(collection => {
      this.aminitiesList.push({
        name: collection.name,
        id: collection.id,
        img: collection.icon,
        active: false
      });
    });
  }
  async checkAvailability(payload: any) {
    this.spinner.hide()
    this.resetAminitiesList();
    this.susbcription.unsubscribe();
    this.susbcription = new Subscription();
    this.hasLoading = true;
    const subscription =  this.apiService.httpPost("/ext/checkAvailability", payload).subscribe(async (res: any) => {
      if (res.success) {
        const setData = {
          checkInDate: payload?.checkInDate,
          checkOutDate: payload?.checkOutDate,
          destination: payload?.destination,
          selectedGuest: payload?.selectedGuest,
        };
        this.hotelLists = res.data.available;
        this.hotelsRes = res.data;
        this.dataService.setSharedData(setData)
        this.resetAminitiesList();
        await this.pushCollectionsToAminitiesList(this.collections)
        await this.aminitiWiseFilter(res.data);
        this.hasLoading = false;
      }
    }, (error) => {
      this.hasLoading = false;
    });
    this.susbcription.add(subscription);
  }

  async aminitiWiseFilter(properties: any) {
    this.aminitiesList[0].properties = properties?.available ? properties?.available : [];
    for (const collection of this.aminitiesList.slice(1)) {
      const propertyIds = properties?.propertiesByCollection ? properties.propertiesByCollection[collection.id.toString()] : 0;
      if (propertyIds) {
        collection.properties = properties.available.filter((property: any) => propertyIds.includes(property.id));
      } else {
        collection.properties = []
      }
    }

    this.aminitiesList = this.aminitiesList.filter((collection: any) => collection?.properties?.length > 0);
  }

  private filterProperties() {
    this.resetAminitiesList()
    this.pushCollectionsToAminitiesList(this.collections)
    this.setProperty()
    this.filteredProperties.available = this.hotelsRes?.available?.filter((property: any) =>
      property.price_per_night >= this.filter.minPrice &&
      property.price_per_night <= this.filter.maxPrice &&
      (this.filter.bedrooms === 'Any' || property.bedrooms === Number(this.filter.bedrooms)) &&
      (!this.filter.amenities || this.filter.amenities.length === 0 || (Array.isArray(this.filter.amenities) &&
      this.filter.amenities.every(amenityId => property.amenities.some((amenity: any) => amenity.amenity_id === amenityId)))) &&
      (!this.filter.propertyType || this.filter.propertyType.length === 0 || this.filter.propertyType.includes(property.property_type))
    );

    this.aminitiWiseFilter(this.filteredProperties)
    this.spinner.hide()
  }

  resetAminitiesList() {
    this.aminitiesList = JSON.parse(JSON.stringify(this.defaultAminities));
  }

  setProperty() {
    this.filteredProperties = JSON.parse(JSON.stringify(this.hotelsRes));
  }
}

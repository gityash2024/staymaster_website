import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/http/api.service';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss']
})
export class TripsComponent {
    headerName: string = 'default';
    viewIndex: number = 0;

    trips: ITrip = {
        cancelled: [],
        ongoing: [],
        past: [],
        success: [],
        upcoming: [],
    };
    tripTabs: { label: string; key: string; }[] = [
        { label: 'Upcoming', key: 'upcoming' },
        { label: 'Past', key: 'past' },
        { label: 'Cancelled', key: 'cancelled' },
    ];
    loading: boolean = true;
    skeletonObject = new Array(20).fill(0).map((_, i) => i + 1);
    isMobile: boolean = false;
    selectedTabKey: string = '';

    constructor(
        private apiService: ApiService,
        private dataService: DataService,
        private router: Router,
    ) {
        this.isMobile = window.innerWidth <= 570;
        window.addEventListener('resize', () =>  this.isMobile = window.innerWidth <= 570);
        if (this.tripTabs.length) this.selectedTabKey = this.tripTabs[0].key;
        this.getTrips();
    }

    getTrips() {
        let payload: any = {};
        payload.guestToken = this.dataService.getWebToken();
        this.apiService.httpPost('/ext/myTrips', payload).subscribe(async (res: any) => {
            this.trips = res;
            this.loading = false;
        });
    }

    onTripClick(bookingId: number) {
        this.router.navigate(['/confirmed-booking'], {
            queryParams: { bookingId: bookingId }
        });
    }
}

interface ITrip {
    success: any[];
    cancelled: any[];
    upcoming: any[];
    past: IPastTrips[];
    ongoing: any[];
    [key: string]: any[];
}
interface IPastTrips {
    end: string;
    google_latitude: string;
    google_longitude: string;
    guests: number;
    id: number;
    listing_name: string;
    media_filename: string;
    property_id: number;
    s3Url: string;
    start: string;
    status: string;
}
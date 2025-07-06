import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { findIndex } from 'rxjs';
import { CONCIERGE_DATA } from '../conceirge-services/conceirge-services.data';

@Component({
    selector: 'app-conceirge-services-list',
    templateUrl: './conceirge-services-list.component.html',
    styleUrls: ['./conceirge-services-list.component.scss']
})
export class ConceirgeServicesListComponent {

    title: string = '';
    headerName: string = 'default';
    selectedConceirgeServices: any = [];
    conceirgeServices: any = CONCIERGE_DATA;

    /**
     * Explicit mapping for filenames that don\'t follow our generic title\n>underscore pattern.
     * Key: the *exact* service name as present in the CONCIERGE_DATA array
     * Value: the corresponding image filename that exists inside src/assets/images
     */
    private readonly IMAGE_FILENAME_MAP: Record<string, string> = {
        'Doctor On Call': 'Doctor_on_Call.png',
        'Airport Pick up': 'Airport_Pick up.png',
        'In-villa Dining': 'In_Villa_Dining.png',
        'Extra Bed': 'Extra_bed.png',
        'Mixologist On Call': 'Mixologist_on_Call.png',
        'Yoga Session': 'Yoga_session.png',
        'Book a Spa': 'Book_a_spa.png',
        'Pilates Session': 'Pilates_session.png',
        'Zumba Class': 'Zumba_class.png',
        'Gym Access': 'Gym_access.png',
        'In- Villa Salon Session': 'In_villa_Salon_services.png',
        'Sound Healing': 'Sound_healing.png',
        'Meeting Setup': 'Meeting_set_up.png'
    };

    constructor(
        private route: ActivatedRoute
    ) {
        this.title = 'Conceirge Services';
    }
    
    ngOnInit() {
        let param2 = this.route.snapshot.queryParams["id"];
        let index = this.conceirgeServices.findIndex((param: any) => param.id == param2);
        if (index > -1) {
            this.selectedConceirgeServices = this.conceirgeServices[index].description;
            this.title = this.conceirgeServices[index].title;
        }
    }

    getImagePath(name: string): string {
        // 1. If we have an explicit mapping, use it directly
        if (this.IMAGE_FILENAME_MAP[name]) {
            return `../../../assets/images/${this.IMAGE_FILENAME_MAP[name]}`;
        }

        // 2. Otherwise, build filename by replacing non-alphanumerics with an underscore
        const fileName = name
            .replace(/[’'`]/g, '')        // remove apostrophes/backticks
            .replace(/[^a-zA-Z0-9]/g, '_') // replace non-alphanumeric with underscore
            .replace(/_+/g, '_')           // collapse consecutive underscores
            .trim();
        return `../../../assets/images/${fileName}.png`;
    }

    /**
     * When an image fails to load we replace it with a generic placeholder so the
     * user never sees the alt text as a broken image label.
     */
    handleImgError(evt: Event): void {
        const imgElement = evt.target as HTMLImageElement;
        imgElement.src = 'assets/images/lalithmalhaar-gadi.png';
    }
}

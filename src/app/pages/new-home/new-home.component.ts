import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import moment from 'moment';
import { ApiService } from 'src/app/services/http/api.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Util } from 'src/app/shared/utilities';
declare var bootstrap: any;

@Component({
    selector: 'app-new-home',
    templateUrl: './new-home.component.html',
    styleUrls: ['./new-home.component.scss'],
})
export class NewHomeComponent {
    menuName: string = 'Destination';
    activeLocation: string = 'Goa';
    collections: string = '';
    settingData: any = [];
    hotelsData: any = [];
    currentIndex: number = 0;
    pageSize: number = 4;
    enquiryForm: FormGroup;
    formSubmitted = false;
    slides = [
        {
            src: '../../../assets/images/landing-page-banner.jpg',
            alt: 'Slide 1'
        },
        {
            src: '../../../assets/images/stay-description-bg.jpg',
            alt: 'Slide 2'
        },
        {
            src: '../../../assets/images/home-bg.jpg',
            alt: 'Slide 3'
        },
        {
            src: '../../../assets/images/home-bg-2.jpg',
            alt: 'Slide 4'
        }
    ];
    propertyOptions: any = [];
    overlayVisible: boolean = false;
    aboutUs: IAboutUs[] = [
        {
            icon: '../../../assets/images/Mask group 1.png',
            head: 'Beautiful homes',
            desc: 'Aesthetics so on point, your camera feed will fill up!'
        },
        {
            icon: '../../../assets/images/Mask group 2.png',
            head: 'Modern amenities',
            desc: 'Your property must-have list is fulfilled before you even make it.'
        },
        {
            icon: '../../../assets/images/Mask group 3.png',
            head: 'Exclusivity',
            desc: 'A little or luxe slice of paradise—private, cozy, and oh-so-comfortable.'
        },
        {
            icon: '../../../assets/images/Mask group 4.png',
            head: 'Endless choices',
            desc: 'Villas, condos, or holiday retreats—the toughest part is picking one!'
        },
        {
            icon: '../../../assets/images/Mask group 3.png',
            head: 'Expert care',
            desc: 'Fixing a tricky hot water knob to whipping up some midnight hot chocolate, we have got your back.'
        },
        {
            icon: '../../../assets/images/Mask group 1.png',
            head: 'Concierge services',
            desc: 'Airport transfers, private chefs, sightseeing tours, and much more—All you have to do is arrive!'
        }
    ]
    insightsCards: IInsightCard[] = [
        {
            image: '../../../../assets/images/market-size.png',
            cardName: 'Handpicked Homes',
            cardTitle: '150+'
        },
        {
            image: '../../../../assets/images/appreciation.png',
            cardName: 'Happy Guests',
            cardTitle: '100K+'
        },
        {
            image: '../../../../assets/images/neighbourhood.png',
            cardName: 'Nights Booked',
            cardTitle: '60K+'
        },
        {
            image: '../../../../assets/images/benchmark.png',
            cardName: 'Concierge',
            cardTitle: '24x7'
        }
    ]

    @Input() public headerName: string = 'home';
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    @Output() checkInOut: EventEmitter<any> = new EventEmitter();
    minItems = 1;

    constructor(
        private mms: ModalManagerService,
        private apiService: ApiService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private dataService: DataService,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) {
        this.enquiryForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            property_type: ['', Validators.required],
        });
    }

    toggleMenu() {
        const isMobile = window.innerWidth <= 992;
        if (isMobile) {
            this.overlayVisible = true;
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        else this.mms.topMenuModal({ id: 0 }).subscribe((res: any) => {});
    }

    ngAfterViewInit(): void {
        const carouselElement = document.getElementById(
            'carouselExampleIndicators'
        );
        if (carouselElement) {
            new bootstrap.Carousel(carouselElement, {
                interval: 5000,
                ride: 'carousel',
            });
        }
    }

    async ngOnInit() {
        this.dataService.clearSharedData();
        // this.getFormSettings();
        // await this.getSettingData();
        await this.checkAvailabilityForToday();
        this.spinner.hide();
    }

    async checkAvailabilityForToday() {
        const payload: any = {};
        await this.callApi(payload).then((response: any) => {
            if (response.success) {

                //0 - set property options
                this.propertyOptions = response.data.formSettings.property_types;

                //1 - set setting data
                this.settingData = response.data.settings;
                this.collections = this.settingData.collections[0].name;

                //2 - set hotels data
                response.data.available.map((property: any) => {
                    if (response.data.featured.includes(property.id)) {
                        this.hotelsData.push({
                            ...property,
                        });
                    }
                });
                for (const collection of this.settingData?.collections) {
                    const propertyIds =
                        response.data.propertiesByCollection[collection.id.toString()];
                    if (propertyIds) {
                        collection.properties = response.data.available.filter(
                            (property: any) => propertyIds.includes(property.id)
                        );
                    } else {
                        collection.properties = [];
                    }
                }
                this.settingData.collections = this.settingData.collections.filter(
                    (collection: any) => collection.properties.length > 0
                );
            }
        });
    }

    /** Check Availability */
    checkAvailability(data: any) {
        this.spinner.show();
        this.dataService.clearSharedData();
        const payload: any = {
            destination: data.destination.id,
            ...(data.checkInDate && {
                check_in_date: moment(data.checkInDate).format('YYYY-MM-DD'),
            }),
            ...(data.checkOutDate && {
                check_out_date: moment(data.checkOutDate).format('YYYY-MM-DD'),
            }),
            ...(data.selectedGuest != '' && {
                number_adults: data.selectedGuest.number_adults,
            }),
            ...(data.selectedGuest != '' && {
                number_children: data.selectedGuest.number_children,
            }),
        };
        this.dataService.setSharedData(payload);
        this.router.navigate(['/stay/all'], {
            queryParams: {
                ...Util.purifyObject(payload)
            }
        });
    }

    callApi(payload: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService
                .httpPost(`${'/ext/homeAvailability'}`, payload)
                .subscribe((res: any) => {
                    resolve(res);
                });
        });
    }

    /** Get Setting Data */
    async getSettingData() {
        await this.apiService
            .httpGet('/properties/settings')
            .subscribe((res: any) => {
                if (res) {
                    this.settingData = res;
                    this.collections = this.settingData.collections[0].name;
                }
            });
    }

    async nextProperty() {
        this.router.navigate(['/stay/all']);
    }

    currentProperties(properties: any) {
        return properties.slice(
            this.currentIndex,
            this.currentIndex + this.pageSize
        );
    }

    nextPage(properties: any) {
        if (this.currentIndex + this.pageSize < properties.length) {
            this.currentIndex += 1;
        } else {
            this.currentIndex = 0;
        }
    }

    /** Redirect stay and description */
    // storeAndRedirectStayDescription(data: any) {
    //     this.router.navigate(['/stay-description/' + data.slug]);
    // }

    storeAndRedirectStayDescription(data: any) {
        const url = this.router.serializeUrl(
            this.router.createUrlTree(['/stay-description/' + data.slug])
        );
        window.open(url, '_blank');
    }

    openExternalLink(url: string) {
        window.open(url, '_blank');
    }
    getFormSettings() {
        return this.apiService
            .httpGet('/ext/formSettings')
            .subscribe((res: any) => {
                this.propertyOptions = res.property_types;

                console.log(this.propertyOptions);
            });
    }

    onSubmit(form: any): void {
        this.formSubmitted = true;

        const payload = {
            form_type: 'get_in_touch',
            name: form.value.name || '',
            email: form.value.email || '',
            phone: form.value.phone || '',
            property_type: form.value.property_type || '',
        };

        if (form.valid) {
            this.apiService
                .httpPostForm('/ext/submitForm', payload, 'text')
                .subscribe((res: any) => {
                    console.log('Form submitted successfully:', res);
                    form.reset();
                    this.formSubmitted = false;
                    this.toastr.success(
                        `Thank you for your enquiry, we will get in touch with you shortly`
                    );
                });
        } else {
            console.warn('Form is invalid. Please correct the errors.');
        }
    }

    get isMobileView(){
        return window.innerWidth <= 768;
    }
}

interface IAboutUs {
    icon: string;
    head: string;
    desc: string;
}

interface IInsightCard {
    image: string;
    cardTitle: string;
    cardName: string;
}
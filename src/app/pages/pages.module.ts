import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutUsComponent } from './about-us/about-us.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import {MatListModule} from '@angular/material/list';
import { InvestComponent } from './invest/invest.component';
import { HostComponent } from './host/host.component';
import { AllPropertiesComponent } from './all-properties/all-properties.component';
// import {MatExpansionModule} from '@angular/material/expansion';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { FormControl } from '@angular/forms';
// import {MatSelectModule} from '@angular/material/select';
import { PropertiesFilterModalComponent } from '../modal/properties-filter-modal/properties-filter-modal.component';
import { PropertyDetailsComponent } from './invest/property-details/property-details.component';
import { StayComponent } from './stay/stay.component';
import { DontWarrySectionComponent } from './common/dont-warry-section/dont-warry-section.component';
import { StayDescriptionComponent } from './stay-description/stay-description.component';
import { MealPricingModalComponent } from './stay-description/meal-pricing-modal/meal-pricing-modal.component';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import {MatDatepickerModule} from '@angular/material/datepicker';
import { SharedModule } from '../shared/shared.module';
import { ConfirmBookingComponent } from './booking/confirm-booking/confirm-booking.component';
import { ConfirmedBookingComponent } from './booking/confirmed-booking/confirmed-booking.component';
import { HouseRulesModalComponent } from './stay-description/house-rules-modal/house-rules-modal.component';
import { PrivacyPolicyModalComponent } from './stay-description/privacy-policy-modal/privacy-policy-modal.component';
import { CancellationRefundModalComponent } from './stay-description/cancellation-refund-modal/cancellation-refund-modal.component';
import { MenuModalComponent } from './header/menu-modal/menu-modal.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { TripsComponent } from '../user/trips/trips.component';
import { NotificationsComponent } from '../user/notifications/notifications.component';
import { PrivacyPolicyComponent } from '../user/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from '../user/terms-and-conditions/terms-and-conditions.component';
import { ConceirgeServicesComponent } from '../user/conceirge-services/conceirge-services.component';
import { ConceirgeServicesListComponent } from '../user/conceirge-services-list/conceirge-services-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { AboutAmenityModalComponent } from './stay-description/about-amenity-modal/about-amenity-modal.component';
import { AboutPropertyModalComponent } from './stay-description/about-property-modal/about-property-modal.component';
import { GoogleMapComponentComponent } from './stay-description/google-map/google-map.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { ExternalLibraryService } from './booking/confirm-booking/util';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { QRCodeModule } from 'angularx-qrcode';
import { NgChartsModule } from 'ng2-charts';
import { ConciergeDescriptionComponent } from '../user/conceirge-services-list/concierge-description/concierge-description.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { BlogsComponent } from './blogs/blogs.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutUsComponent,
    HeaderComponent,
    FooterComponent,
    InvestComponent,
    HostComponent,
    AllPropertiesComponent,
    PropertiesFilterModalComponent,
    PropertyDetailsComponent,
    StayComponent,
    DontWarrySectionComponent,
    StayDescriptionComponent,
    MealPricingModalComponent,
    ConfirmBookingComponent,
    ConfirmedBookingComponent,
    HouseRulesModalComponent,
    PrivacyPolicyModalComponent,
    CancellationRefundModalComponent,
    MenuModalComponent,
    ProfileComponent, LoginComponent,
    TripsComponent,
    NotificationsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    ConceirgeServicesComponent,
    ConceirgeServicesListComponent,
    LandingPageComponent,
    ContactUsComponent,
    NewHomeComponent,
    AboutAmenityModalComponent,
    AboutPropertyModalComponent,
    PhotoGalleryComponent,
    ConciergeDescriptionComponent,
    BlogsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    NgxSliderModule,
    GoogleMapComponentComponent,
    QRCodeModule,
    NgChartsModule,
    NgxMasonryModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PagesModule { }

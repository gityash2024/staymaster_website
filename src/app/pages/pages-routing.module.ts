import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AllPropertiesComponent } from './all-properties/all-properties.component';
import { HomeComponent } from './home/home.component';
import { InvestComponent } from './invest/invest.component';
import { HostComponent } from './host/host.component';
import { PropertyDetailsComponent } from './invest/property-details/property-details.component';
import { StayComponent } from './stay/stay.component';
import { StayDescriptionComponent } from './stay-description/stay-description.component';
import { ConfirmBookingComponent } from './booking/confirm-booking/confirm-booking.component';
import { ConfirmedBookingComponent } from './booking/confirmed-booking/confirmed-booking.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { TripsComponent } from '../user/trips/trips.component';
import { NotificationsComponent } from '../user/notifications/notifications.component';
import { PrivacyPolicyComponent } from '../user/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from '../user/terms-and-conditions/terms-and-conditions.component';
import { ConceirgeServicesComponent } from '../user/conceirge-services/conceirge-services.component';
import { ConceirgeServicesListComponent } from '../user/conceirge-services-list/conceirge-services-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StayDestinationComponent } from '../modal/stay-destination/stay-destination.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { ConciergeDescriptionComponent } from '../user/conceirge-services-list/concierge-description/concierge-description.component';
import { BlogsComponent } from './blogs/blogs.component';
const routes: Routes = [
  {
    path: '',
    // component: LandingPageComponent,
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: NewHomeComponent
  },
  {
    path: 'blogs',
    component: BlogsComponent
  },
  {
    path: 'hometwo',
    component: HomeComponent
  },
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path: 'host',
    component: HostComponent
  },
  {
    path: 'invest-old',
    component: InvestComponent
  },
  {
    path: 'all-properties',
    component: AllPropertiesComponent
  },
  {
    path: 'invest-property-details-old',
    component: PropertyDetailsComponent
  },
  {
    path: 'stay/:stayType',
    component: StayComponent
  },
  {
    path: 'stay-destinations',
    component: StayDestinationComponent
  },
  {
    path: 'stay-description/:id',
    component: StayDescriptionComponent,
  },
  {
    path: 'stay-description/:id/photo-gallery',
    component: PhotoGalleryComponent,
  },
  {
    path: 'confirm-booking',
    component: ConfirmBookingComponent
  },
  {
    path: 'confirmed-booking',
    component: ConfirmedBookingComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'conceirge-service',
    component: ConceirgeServicesComponent
  },
  {
    path: 'conceirge-service-list',
    component: ConceirgeServicesListComponent
  },
  {
    path: 'trips',
    component: TripsComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
  },
  {
    path: 'concierge-description',
    component: ConciergeDescriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

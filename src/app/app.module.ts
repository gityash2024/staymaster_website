import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomModalComponent } from './modal/custom-modal/custom-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
// import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptor/api.interceptor';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { QRCodeModule } from 'angularx-qrcode';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from './shared/shared.module';


// Extend Day.js with the necessary plugin
dayjs.extend(customParseFormat);


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CustomModalComponent,
    AdminLayoutComponent,
    // DashboardComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxDaterangepickerMd.forRoot(),
    BrowserAnimationsModule, MatDialogModule, MatIconModule, MatButtonModule, MatDialogModule, MatSliderModule,
    BrowserAnimationsModule, MatDialogModule, MatIconModule, MatButtonModule, MatToolbarModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule, MatSelectModule, HttpClientModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxSliderModule,
    QRCodeModule,
    MatMenuModule,
    SharedModule
  ],
  providers: [Title, { provide: LocationStrategy, useClass: PathLocationStrategy }, { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }, { provide: ToastrService, useClass: ToastrService }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }

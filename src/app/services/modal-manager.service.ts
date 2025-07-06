import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PropertiesFilterModalComponent } from '../modal/properties-filter-modal/properties-filter-modal.component';
import { AddNewPropertyComponent } from '../admin/properties/add-new-property/add-new-property.component';
import { MealPricingModalComponent } from '../pages/stay-description/meal-pricing-modal/meal-pricing-modal.component';
import { PrivacyPolicyModalComponent } from '../pages/stay-description/privacy-policy-modal/privacy-policy-modal.component';
import { CancellationRefundModalComponent } from '../pages/stay-description/cancellation-refund-modal/cancellation-refund-modal.component';
import { HouseRulesModalComponent } from '../pages/stay-description/house-rules-modal/house-rules-modal.component';
import { MenuModalComponent } from '../pages/header/menu-modal/menu-modal.component';
import { LoginComponent } from '../pages/login/login.component';
import { StayDestinationComponent } from '../modal/stay-destination/stay-destination.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AboutPropertyModalComponent } from '../pages/stay-description/about-property-modal/about-property-modal.component';
import { AboutAmenityModalComponent } from '../pages/stay-description/about-amenity-modal/about-amenity-modal.component';
import { AddAminitieComponent } from '../admin/aminities/add-aminitie/add-aminitie.component';
import { DeclineHostComponent } from '../admin/host-bookings/decline-host/decline-host.component';
import { ViewServiceRequestComponent } from '../admin/service-requests/view-service-request/view-service-request.component';

@Injectable({
  providedIn: 'root'
})
export class ModalManagerService {

  currentView: string = '';
  deviceInfo: any = null;
  constructor(public dialog: MatDialog, private deviceService: DeviceDetectorService,) {
    this.epicFunction();

   }

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if (isDesktopDevice) {
      this.currentView = 'Desktop';
    } else if (isTablet) {
      this.currentView = 'Tablet';
    } else {
      this.currentView = 'Mobile';
    }
  }

  openFilerModal(data: any): Observable<any>{
    var dialogConfig = new MatDialogConfig();
    var dataProperties = data.data;
    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;
    dialogConfig.width = dataProperties?.modalWidth;
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    let dialogRef: MatDialogRef<PropertiesFilterModalComponent>;
    let dialogRefRes = this.dialog.open(PropertiesFilterModalComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }

  openAddAminitiesModel(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;
    // dialogConfig.width = "70%";
    // dialogConfig.height = "60vh";
    let dialogRef: MatDialogRef<AddAminitieComponent>;
    let dialogRefRes = this.dialog.open(AddAminitieComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }

  mealPricingModal(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;    
    dialogConfig.width = data?.data?.modalWidth ? data?.data?.modalWidth :'50%';
    // dialogConfig.width = "70%";
    dialogConfig.height = "80vh";
    let dialogRef: MatDialogRef<MealPricingModalComponent>;
    let dialogRefRes = this.dialog.open(MealPricingModalComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }
  houseRulesModal(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;
    // dialogConfig.width = "70%";
    dialogConfig.height = "80vh";
    let dialogRef: MatDialogRef<HouseRulesModalComponent>;
    let dialogRefRes = this.dialog.open(HouseRulesModalComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }
  privacyPolicyModal(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;
    // dialogConfig.width = "70%";
    dialogConfig.height = "80vh";
    let dialogRef: MatDialogRef<PrivacyPolicyModalComponent>;
    let dialogRefRes = this.dialog.open(PrivacyPolicyModalComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }
  cancellationRefundModal(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;
    // dialogConfig.width = "70%";
    dialogConfig.height = "80vh";
    let dialogRef: MatDialogRef<CancellationRefundModalComponent>;
    let dialogRefRes = this.dialog.open(CancellationRefundModalComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }
  topMenuModal(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    // dialogConfig.data = data;
    // // dialogConfig.width = "70%";
    // dialogConfig.height = "80vh";
    let dialogRef: MatDialogRef<MenuModalComponent>;
    let dialogRefRes = this.dialog.open(MenuModalComponent, {
      data: data,
      height: '100vh',
      width: '550px',
      position: { right: '0px', top: '0px' }
    });
    return dialogRefRes.afterClosed();
  }

  loginModal(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    let dialogRef: MatDialogRef<LoginComponent>;
    let dialogRefRes = this.dialog.open(LoginComponent, {
      data: data,
      height: '75vh',
      width: '100%',
      position: {  top: '0px' }
    });
    return dialogRefRes.afterClosed();
  }

  openAddNewPropertyModel(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;
    dialogConfig.width = "80%";
    dialogConfig.height = "80vh";
    let dialogRef: MatDialogRef<AddNewPropertyComponent>;
    let dialogRefRes = this.dialog.open(AddNewPropertyComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }

  openGuestSearchModal(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = data?.data?.modalWidth ? data?.data?.modalWidth :'50%';
    dialogConfig.height = "80vh";
    let dialogRef: MatDialogRef<StayDestinationComponent>;
    let dialogRefRes = this.dialog.open(StayDestinationComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }

  openAboutPropertyModal(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;
    dialogConfig.width = data?.data?.modalWidth ? data?.data?.modalWidth :'50%';
    dialogConfig.height = "80vh";
    let dialogRef: MatDialogRef<AboutPropertyModalComponent>;
    let dialogRefRes = this.dialog.open(AboutPropertyModalComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }
  openAboutAmenityModal(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;
    dialogConfig.width = data?.data?.modalWidth ? data?.data?.modalWidth :'50%';
    dialogConfig.height = "80vh";
    let dialogRef: MatDialogRef<AboutAmenityModalComponent>;
    let dialogRefRes = this.dialog.open(AboutAmenityModalComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }

  openDeclineHostModal(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;
    dialogConfig.width = data?.data?.modalWidth ? data?.data?.modalWidth :'50%';
    dialogConfig.height = "80vh";
    let dialogRef: MatDialogRef<DeclineHostComponent>;
    let dialogRefRes = this.dialog.open(DeclineHostComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }

  openViewServiceRequestModal(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "panel-class";
    dialogConfig.data = data;
    dialogConfig.width = data?.data?.modalWidth ? data?.data?.modalWidth :'80%';
    dialogConfig.height = "80vh";
    let dialogRef: MatDialogRef<ViewServiceRequestComponent>;
    let dialogRefRes = this.dialog.open(ViewServiceRequestComponent, dialogConfig);
    return dialogRefRes.afterClosed();
  }
}

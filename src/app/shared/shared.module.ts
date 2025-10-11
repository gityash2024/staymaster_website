import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MenuContentComponent } from '../pages/header/menu-content/menu-content.component';
import { StayDestinationComponent } from '../modal/stay-destination/stay-destination.component';
import { CommonModule } from '@angular/common';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';


// import { ScrollStrategyOptions, CloseScrollStrategy, Overlay } from '@angular/cdk/overlay';
// import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
@NgModule({
  declarations: [
    MenuContentComponent,
    StayDestinationComponent
  ],
  exports: [
    MatIconModule, MatToolbarModule, MatButtonModule, FlexLayoutModule,
    MatSidenavModule, MatListModule, MatMenuModule, MatTableModule, MatDialogModule,
    MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule,
    MatAutocompleteModule, MatCheckboxModule, MatExpansionModule, MatDatepickerModule,
    MatNativeDateModule, MatRadioModule, MatTabsModule, MatCardModule, MenuContentComponent,
    StayDestinationComponent
  ],
  imports: [
    ToastrModule.forRoot(),
    MatMenuModule,
    CommonModule,
    MatIconModule,
    NgxSliderModule,
    NgxDaterangepickerMd,
    FlexLayoutModule
  ],
  providers: [
    { provide: ToastrService, useClass: ToastrService }
  ]
})
export class SharedModule { }
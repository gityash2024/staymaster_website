import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from '../pages/about-us/about-us.component';

const APP_ROUTES: Routes = [
];

export const routing = RouterModule.forRoot(APP_ROUTES, { scrollPositionRestoration: 'enabled' });
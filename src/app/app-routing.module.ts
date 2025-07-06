import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LAYOUT_ROUTES } from './routes/layout.routes';
import { ADMIN_ROUTES } from './routes/admin.routes';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: LAYOUT_ROUTES
  },
  {
    path: 'adminlogin',
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: ADMIN_ROUTES
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    useHash: false,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

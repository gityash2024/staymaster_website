import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestsComponent } from './guests/guests.component';


const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
	},
	{
		path: 'bookings',
		loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule)
	},
	{
		path: 'properties',
		loadChildren: () => import('./properties/properties.module').then(m => m.PropertiesModule)
	},
	{
		path: 'rates-and-inventory',
		loadChildren: () => import('./rates-and-inventory/rates-and-inventory.module').then(m => m.RatesAndInventoryModule)
	},
	{
		path: 'user-management',
		loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
	},
	{
		path: 'service-requests',
		loadChildren: () => import('./service-requests/service-requests.module').then(m => m.ServiceRequestsModule)
	},
	{
		path: 'host-bookings',
		loadChildren: () => import('./host-bookings/host-bookings.module').then(m => m.HostBookingsModule)
	},
	{
		path: 'customer-service',
		loadChildren: () => import('./customer-service/customer-service.module').then(m => m.CustomerServiceModule)
	},
	{
		path: 'packages',
		loadChildren: () => import('./packages/packages.module').then(m => m.PackagesModule)
	},
	{
		path: 'settings',
		loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
	},
	{
		path: 'rate-threshold',
		loadChildren: () => import('./rate-threshold/rate-threshold.module').then(m => m.RateThresholdModule)
	},
	{
		path: 'promotions',
		loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule)
	},
	{
		path: 'rate-template',
		loadChildren: () => import('./rate-template/rate-template.module').then(m => m.RateTemplateModule)
	},
	{
		path: 'guests',
		component: GuestsComponent
	},
	{
		path: 'aminities',
		loadChildren: () => import('./aminities/aminities.module').then(m => m.AminitiesModule)

	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }

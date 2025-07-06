export class Constants {
    public static allPropertyFilterModelType = {
        location:'Location',
        amenities: 'Amenities',
        propertyType: 'Property Type'
    }

    public static deviceDimension = {
        mobile: 'Mobile',
        tablet: 'Tablet',
        desktop: 'Desktop'
    }

    public static adminModuleDrawerListItems = [
        {
            icon: 'dashboard.png',
            title:'Dashboard',
            routerLink:'/admin',
        },
        {
            icon: 'bookings.png',
            title:'Bookings',
            routerLink:'/admin/bookings',
        },
        {
            icon: 'property_management.png',
            title:'Property Management',
            routerLink:'/admin/properties',
        },
        {
            icon: 'rates_inventory.png',
            title:'Rates & Inventory',
            routerLink:'/admin/rates-and-inventory',
        },
        {
            icon: 'user_management.png',
            title:'User Management',
            routerLink:'/admin/user-management',
        },
        {
            icon: 'service_requests.png',
            title:'Service Requests',
            routerLink:'/admin/service-requests',
        },
        {
            icon: 'host_bookings.png',
            title:'Host Bookings',
            routerLink:'/admin/host-bookings',
        },
        {
            icon: 'customer_service.png',
            title:'Customer Service',
            routerLink:'/admin/customer-service',
        },
        {
            icon: 'packages.png',
            title:'Packages',
            routerLink:'/admin/packages',
        },
        {
            icon: 'settings.png',
            title:'Settings',
            routerLink:'/admin/settings',
        },
        {
            icon: 'rate_threshold.png',
            title:'Rate Threshold',
            routerLink:'/admin/rate-threshold',
        },
        {
            icon: 'promotions.png',
            title:'Promotions',
            routerLink:'/admin/promotions',
        },
        {
            icon: 'rate_templates.png',
            title:'Rate Template',
            routerLink:'/admin/rate-template',
        }
    ]
}

/**
 *  <a class="list-item" mat-list-item [routerLink]="'/admin'" routerLinkActive="active">
        <img src="../../../assets/admin/icons/dashboard.png" alt=""> Dashboard
      </a>
      <a class="list-item" mat-list-item [routerLink]="'/admin/properties'" routerLinkActive="active">
        <img src="../../../assets/admin/icons/dashboard.png" alt=""> Bookings
      </a>
      <a class="list-item" mat-list-item [routerLink]="'/admin/host'" routerLinkActive="active">
        <img src="../../../assets/admin/icons/dashboard.png" alt=""> Host
      </a>
      <a class="list-item" mat-list-item [routerLink]="'/admin/bookings'" routerLinkActive="active">
        <img src="../../../assets/admin/icons/dashboard.png" alt="">    Bookings
      </a>
      <a class="list-item" mat-list-item [routerLink]="'/admin/guests'" routerLinkActive="active">
        <img src="../../../assets/admin/icons/dashboard.png" alt=""> Guests

      </a>
      <a class="list-item" mat-list-item [routerLink]="'/admin/aminities'" routerLinkActive="active">
        <img src="../../../assets/admin/icons/dashboard.png" alt=""> Amenities Master

      </a>
      <a class="list-item" mat-list-item [routerLink]="'/admin/property-types'" routerLinkActive="active">
        <img src="../../../assets/admin/icons/dashboard.png" alt=""> Property Type Master

      </a>
      <a class="list-item" mat-list-item [routerLink]="'/'" routerLinkActive="active">
        <img src="../../../assets/admin/icons/dashboard.png" alt=""> Logout

      </a>
 */ 
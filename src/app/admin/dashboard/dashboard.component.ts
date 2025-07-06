import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardComponent {
  DashboardCardsData = [    
    {
      title: `Today's Booking`,
      count: 0,
      bgcolor: '#FFFFFF',
      url: '',
      param: 'Dashboard',
      color: '',
      img: '../../../assets/images/monthly sale.avif'
    }, {
      title: `Available Property`,
      count: 0,
      bgcolor: '#FFFFFF',
      url: '',
      param: 'Dashboard',
      color: '',
      img: '../../../assets/images/monthly sale.avif'
    },
    {
      title: 'Booked Property',
      count: 0,
      bgcolor: '#FFFFFF',
      url: '',
      param: 'Dashboard',
      color: '',
      img: '../../../assets/images/monthly sale.avif'
    },
    {
      title: 'Guests',
      count: 0,
      bgcolor: '#FFFFFF',
      url: '',
      param: 'Dashboard',
      color: '',
      img: '../../../assets/images/monthly sale.avif'

    }
  ];

  dashbordData: any = [];
  accessGroup = 'A';
  shop_code = '';
  constructor(
  ) { }
}

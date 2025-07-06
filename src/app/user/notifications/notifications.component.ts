import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  headerName : string = 'default';
  notifications: any[] = [
    {
      content: 'Your booking for the luxury villa in Goa has been confirmed. Check-in starts at 3 PM. Our concierge team will contact you shortly with arrival details.',
      date: '11 November 2022',
      image: '../../../assets/images/notification.png'
    },
    {
      content: 'New investment opportunity available: Premium 3BHK apartment in Mumbai with 14% projected annual returns. Limited time offer for StayMaster investors.',
      date: '11 November 2022',
      image: '../../../assets/images/notification.png'
    },
    {
      content: 'Your property listing in Bangalore received 15 new inquiries this week. Revenue increased by 23% compared to last month. View detailed analytics in your dashboard.',
      date: '11 November 2022',
      image: '../../../assets/images/notification.png'
    },
    {
      content: 'Welcome to StayMaster Select! You now have access to premium properties with enhanced services including dedicated concierge and luxury amenities.',
      date: '11 November 2022',
      image: '../../../assets/images/notification.png'
    },
    {
      content: 'Reminder: Your upcoming stay in Delhi starts tomorrow. We have arranged airport pickup and your welcome package includes local restaurant recommendations.',
      date: '11 November 2022',
      image: '../../../assets/images/notification.png'
    }
  ]
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-todays-overview',
  templateUrl: './todays-overview.component.html',
  styleUrls: ['./todays-overview.component.scss']
})
export class TodaysOverviewComponent {
  cardData=[
    {"Info":"this is dummy info","title":"Booking","data":2},
    {"Info":"this is dummy info","title":"Revenue","data":36000},
    {"Info":"this is dummy info","title":"Occupancy","data":"0.00%"},
    {"Info":"this is dummy info","title":"ADR","data":36000},
    {"Info":"this is dummy info","title":"Booking Lead Time","data":6},
    {"Info":"this is dummy info","title":"Avg LOS","data":"2 Nights"},
    {"Info":"this is dummy info","title":"Unsold Rooms","data":"-2/0"},
    {"Info":"this is dummy info","title":"Out of Inventory in next 60 days","data":454},
    {"Info":"this is dummy info","title":"Bookable Until","data":"31 Mar 2025"},

  ]

  bestSelling= [
    {
      "title":"Destination",
      "data":"Pune",
      "info":"this is dummy info"
    },
    {
      "title":"Room Type",
      "data":"Delux",
      "info":"this is dummy info"
    },
    {
      "title":"Rate Type",
      "data":"EP",
      "info":"this is dummy info"
    }
    
  ]

  months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]
  random_bookings = [
    {
        "guestName": "Varun Kulkarni",
        "guestQty": 8,
        "guestNights": 4,
        "voucherNo": "271530891256",
        "adr": "6235.12",
        "room": "Garden View",
        "rateType": "EP",
        "bookingStatus": "Arrived",
        "fromDay": 15,
        "fromMonth": 6,
        "toDay": 20,
        "toMonth": 6,
    },
    {
        "guestName": "Priya Patel",
        "guestQty": 6,
        "guestNights": 7,
        "voucherNo": "875420936172",
        "adr": "7890.75",
        "room": "Sea Facing",
        "rateType": "CP",
        "bookingStatus": "Arrived",
        "fromDay": 8,
        "fromMonth": 9,
        "toDay": 15,
        "toMonth": 9,
    },
    {
        "guestName": "Rajesh Kumar",
        "guestQty": 3,
        "guestNights": 5,
        "voucherNo": "530976418254",
        "adr": "5421.36",
        "room": "City View",
        "rateType": "EP",
        "bookingStatus": "Arrived",
        "fromDay": 12,
        "fromMonth": 4,
        "toDay": 17,
        "toMonth": 4,
    },
    {
        "guestName": "Aisha Khan",
        "guestQty": 5,
        "guestNights": 3,
        "voucherNo": "794613802576",
        "adr": "6789.23",
        "room": "Sea Facing",
        "rateType": "CP",
        "bookingStatus": "Arrived",
        "fromDay": 3,
        "fromMonth": 11,
        "toDay": 6,
        "toMonth": 11,
    },
    {
        "guestName": "Anand Sharma",
        "guestQty": 7,
        "guestNights": 6,
        "voucherNo": "208547961325",
        "adr": "7312.89",
        "room": "City View",
        "rateType": "EP",
        "bookingStatus": "Arrived",
        "fromDay": 22,
        "fromMonth": 7,
        "toDay": 28,
        "toMonth": 7,
    },
    {
        "guestName": "Neha Kapoor",
        "guestQty": 4,
        "guestNights": 2,
        "voucherNo": "645239187025",
        "adr": "8795.44",
        "room": "Garden View",
        "rateType": "CP",
        "bookingStatus": "Arrived",
        "fromDay": 5,
        "fromMonth": 2,
        "toDay": 7,
        "toMonth": 2,
    },
    {
        "guestName": "Kumar Singh",
        "guestQty": 2,
        "guestNights": 8,
        "voucherNo": "319874562081",
        "adr": "6043.67",
        "room": "Sea Facing",
        "rateType": "EP",
        "bookingStatus": "Arrived",
        "fromDay": 10,
        "fromMonth": 10,
        "toDay": 18,
        "toMonth": 10,
    },
    {
        "guestName": "Pooja Gupta",
        "guestQty": 6,
        "guestNights": 4,
        "voucherNo": "752198346507",
        "adr": "9321.50",
        "room": "City View",
        "rateType": "CP",
        "bookingStatus": "Arrived",
        "fromDay": 14,
        "fromMonth": 1,
        "toDay": 18,
        "toMonth": 1,
    },
    {
        "guestName": "Deepak Verma",
        "guestQty": 3,
        "guestNights": 7,
        "voucherNo": "460239175834",
        "adr": "5678.91",
        "room": "Garden View",
        "rateType": "EP",
        "bookingStatus": "Arrived",
        "fromDay": 19,
        "fromMonth": 8,
        "toDay": 25,
        "toMonth": 8,
    },
    {
        "guestName": "Sonia Mehta",
        "guestQty": 5,
        "guestNights": 5,
        "voucherNo": "182734596028",
        "adr": "7123.45",
        "room": "Sea Facing",
        "rateType": "CP",
        "bookingStatus": "Arrived",
        "fromDay": 1,
        "fromMonth": 5,
        "toDay": 7,
        "toMonth": 5,
    }
]

current:any=1


navigate(to:any){
this.current=to
}

}

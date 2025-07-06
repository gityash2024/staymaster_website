import { Component } from '@angular/core';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent {
  headerName: string = 'transparant';
  panelOpenState = false;
  avgSoldPriceChart = true;
  marketStatisticsCards: any = [
    {
      title: 'Revenue',
      subtitle: 'Rs. 3,50,00,000/ yr',
      lightTitle: 'Growth',
      per: '+ 6 %'
    },
    {
      title: 'Active Properties',
      subtitle: '900',
      lightTitle: 'Growth',
      per: '+ 8 %'
    },
    {
      title: 'Occupancy',
      subtitle: '52 %',
      lightTitle: '',
      per: ''
    },
    {
      title: 'Avg Daily Rate',
      subtitle: 'Rs. 1200',
      lightTitle: '',
      per: ''
    },
    {
      title: 'Appreciation',
      subtitle: '42 %',
      lightTitle: '',
      per: ''
    },
    {
      title: 'Sales Per Month',
      subtitle: '19 Properties',
      lightTitle: '',
      per: ''
    },
    {
      title: 'Household Income',
      subtitle: 'Rs. 35,00,000/ yr',
      lightTitle: 'Country Average',
      per: 'Rs. 25,00,000/ yr'
    },
    {
      title: 'Crime Rate',
      subtitle: '52/ 1000 Residents',
      lightTitle: 'Country Average',
      per: '60/ 1000 Residents'
    }
  ];

  expenses: any = [
    {
      title: 'Marketing Commission'
    },
    {
      title: 'Business Rates'
    },
    {
      title: 'Small Business Relief'
    },
    {
      title: 'Insurance'
    },
    {
      title: 'Safety Checks'
    },
    {
      title: 'Cleaning and Laundry'
    },
    {
      title: 'Utilities'
    },
    {
      title: 'Property Management'
    },
    {
      title: 'Repairs/ Maintenance'
    }
  ];
  
  cashFlow: any = [
    {
      header: 'Cash Flow'
    },
    {
      title: 'Operating Income'
    },
    {
      title: 'Operating Expenses'
    },
    {
      title: 'Net Operating Income'
    },
    {
      title: 'Mortgage Payments'
    },
    {
      total: 'Net Cash Flow'
    },
    {
      header: 'Equity Accumulation'
    },
    {
      title: 'Property Value'
    },
    {
      title: 'Mortgage Balance'
    },
    {
      total: 'Total Equity'
    },
    {
      header: 'Sales Analysis'
    },
    {
      title: 'Total Equity'
    },
    {
      title: 'Cumm. Cash Flow'
    },
    {
      title: 'Cash Invested'
    },
    {
      total: 'Net Profit'
    },
    {
      header: 'Investment Analysis'
    },
    {
      title: 'Cap Rate'
    },
    {
      title: 'Cash on Cash'
    },
    {
      title: 'IRR'
    },
    {
      total: 'ROI'
    }
  ];

  propertyHeads = [
    {
      id: 'calculator',
      title: 'Calculator',
      active: true
    }, 
    {
      id: 'insights',
      title: 'Insights',
      active: false
    }, 
    {
      id: 'market-statistics',
      title: 'Market Statistics',
      active: false
    }, 
    {
      id: 'location',
      title: 'Location & Neighbourhood',
      active: false
    }, 
    {
      id:'financial',
      title: 'Financial Analysis',
      active: false
    },
    {
      id: 'faqs',
      title: 'FAQs',
      active: false
    }
  ];

  viewAllAvgPrice(value: boolean) {
    this.avgSoldPriceChart = value;
  }

  setActiveItem(index: number){
    this.propertyHeads.forEach(val => val.active = false);
    this.propertyHeads[index].active = true;
    this.scrollToSection(index);
  }

  scrollToSection(index: number) {
    const sectionId = this.propertyHeads[index].id;
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }

  get isMobileView(){
    return window.innerWidth <= 991;
  }
}

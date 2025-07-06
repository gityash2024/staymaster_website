import { Component } from '@angular/core';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss']
})
export class InvestComponent {
  propertiesForm: boolean = false;
  headerName: string = 'transparant';

  investors: IInvestor[] = [
    {
      id: 1,
      image: '../../../assets/images/investor-bg.png',
      title: 'Raj, Mumbai',
      desc:'Invested in 3 premium properties through StayMaster and achieved 16% annual returns. The platform\'s property management and guest services made investing hassle-free with consistent rental income.',
      active: true
    },
    {
      id: 2,
      image: '../../../assets/images/investor-bg.png',
      title: 'Priya, Bangalore',
      desc:'StayMaster helped me diversify my portfolio with vacation rental properties. Their market analysis and property selection expertise resulted in 18% ROI on my Goa beachfront investment.',
      active: false
    },
    {
      id: 3,
      image: '../../../assets/images/investor-bg-xs.png',
      title: 'Aryan, Delhi',
      desc: 'Started with one property on StayMaster and now own a portfolio of 5 vacation rentals. Their end-to-end management services and transparent reporting make real estate investment simple and profitable.',
      active: false
    }
  ]
  constructor() {

  }
  ngOnInit() {
    this.propertiesForm = true;
  }
  submit() {
    this.propertiesForm = false;
  }
  close() {
    this.propertiesForm = true;
  }
  joinNow() {

  }
  
  onSelectSlider(id: any) {
    let currentActiveIndex = this.investors.findIndex((item: any) => item.active === true);
    this.investors[currentActiveIndex].active = false;
    let itemIndex = this.investors.findIndex((item: any) => item.id === id);
    this.investors[itemIndex].active = true;
  }

  scrollToElement($element: any): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  get isSmallScreen(){
    return window.innerWidth <= 992;
  }
}

interface IInvestor {
  id: number;
  image: string;
  title: string;
  desc: string;
  active: boolean;
}
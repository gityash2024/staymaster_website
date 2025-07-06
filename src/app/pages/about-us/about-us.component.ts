import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  headerName: string = 'transparant';
  teamProfile: ITeamProfile[] = [
    {
      name: 'Achint',
      profileImage: '../../../assets/images/achint.jpg',
      designation: 'Founding Team'
    },
    {
      name: 'Debbie',
      profileImage: '../../../assets/images/debbie.jpg',
      designation: 'Interior designer'
    },
    {
      name: 'Virender',
      profileImage: '../../../assets/images/virender.jpg',
      designation: 'Supply'
    },
    {
      name: 'Michael',
      profileImage: '../../../assets/images/michael.jpg',
      designation: 'Operations'
    },
    {
      name: 'Pooja',
      profileImage: '../../../assets/images/pooja.jpg',
      designation: 'Strategy'
    },
    {
      name: 'Benishia',
      profileImage: '../../../assets/images/Benishia.jpg',
      designation: 'Hospitality'
    },
    {
      name: 'Lenny',
      profileImage: '../../../assets/images/lenny.jpg',
      designation: 'Reservations'
    },
    {
      name: 'Rohit',
      profileImage: '../../../assets/images/rohit.jpg',
      designation: 'Operations'
    },
    {
      name: 'Gladys',
      profileImage: '../../../assets/images/gladys.jpg',
      designation: 'HR'
    },
    {
      name: 'Pranil',
      profileImage: '../../../assets/images/Pranil.jpg',
      designation: 'Accounts'
    },
  ]

  whyChooseStayMaster: IChooseStayMaster[] = [
    {
      image: '../../../assets/images/Mask group 1.png',
      title: 'Professional Hospitality',
      desc: 'Unparalleled hospitality at par with the service of upscale hotels'
    },
    {
      image: '../../../assets/images/Mask group 2.png',
      title: 'Design-led Private Homes',
      desc: 'Aesthetically pleasing interiors curated for elevated comfort'
    },
    {
      image: '../../../assets/images/Mask group 3.png',
      title: 'For Every Budget',
      desc: 'From affordable to luxurious, homes for every pocket'
    },
    {
      image: '../../../assets/images/Mask group 4.png',
      title: 'Concierge & Support',
      desc: 'When personalised experiences meet unforgettable memories'
    }
  ]

  destinations: IChooseStayMaster[] = [
    {
      image: 'assets/images/Mask group (1).png',
      title: 'Goa',
      desc: 'Sun, sand, and endless bliss: escape to Goa’s perfect tropical paradise.'
    },
    {
      image: 'assets/images/Mask group (2).png',
      title: 'Manali',
      desc: 'Explore idyllic retreats amidst Manali’s sunkissed peaks and majestic mountains'
    },
    {
      image: 'assets/images/Mask group (3).png',
      title: 'Bhimtal',
      desc: "Lakeside serenity awaits at Bhimtal's enchanting vacation stays"
    },
    {
      image: 'assets/images/Mask group (4).png',
      title: 'Mussoorie',
      desc: "Experience blissful serenity in Mussoorie's hillside haven"
    },
    {
      image: 'assets/images/Mask group (5).png',
      title: 'Kamshet',
      desc: 'The perfect weekend getaway to rejuvenate in the embrace of the Sahyadris'
    },
  ]

  openSocialMedia(url: string) {
    window.open(url, "_blank");
  }
}
interface ITeamProfile {
  profileImage: string;
  name: string;
  designation: string;
}

interface IChooseStayMaster{
  image: string;
  title: string;
  desc: string;
}

import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  isStayDescriptionPage = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.checkRoute());

    // initial check (in case component instantiates after navigation)
    this.checkRoute();
  }

  private checkRoute(): void {
    this.isStayDescriptionPage = this.router.url.includes('/stay-description');
  }

  collections: ICollections[] = [
    {
      name: 'Masterpiece',
      path: '/stay/masterpiece'
    },
    {
      name: 'New Launches',
      path: '/stay/new-launches'
    },
    {
      name: 'Amazing Pools',
      path: '/stay/amazing-pools'
    },
    {
      name: 'Sea View',
      path: '/stay/sea-view'
    },
    {
      name: 'Celebrity Favourites',
      path: '/stay/celebrity-favourites'
    },
    {
      name: 'Nature',
      path: '/stay/nature'
    },
    {
      name: 'Pet Friendly',
      path: '/stay/pet-friendly'
    },
    {
      name: 'Couple Escapades',
      path: '/stay/couple-escapades'
    },
    {
      name: 'Pocket Friendly',
      path: '/stay/pocket-friendly'
    },
    {
      name: 'Close to Beaches',
      path: '/stay/close-to-beaches'
    },
    {
      name: 'Culinary Delights',
      path: '/stay/culinary-delights'
    },
  ];
  
  openSocialMedia(url: string) {
    window.open(url, "_blank");
  }
}

interface ICollections{
  name: string;
  path: string;
}
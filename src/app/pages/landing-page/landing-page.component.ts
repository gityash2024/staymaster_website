import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  constructor(public router: Router) {

  }
  redirect() {
    const url = "https://live.ipms247.com/booking/book-rooms-staymaster";
    // this.router.navigateByUrl(url);
    window.location.replace(url);
  }

  openSocialMedia(url: string) {
    window.open(url, "_blank");
  }
}

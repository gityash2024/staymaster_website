import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  headerName : string = 'default';

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
}

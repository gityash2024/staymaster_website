import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dont-warry-section',
  templateUrl: './dont-warry-section.component.html',
  styleUrls: ['./dont-warry-section.component.scss']
})
export class DontWarrySectionComponent {
  panelOpenState = false;
  pageSelect = 'host';
  showDontWorrySection: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.showDontWorrySection = this.route.snapshot.url.some(segment => (segment.path === 'stay' || segment.path === 'stay-description'));
  }
  tabSelected(page:any){
    this.pageSelect =  page
  }
}

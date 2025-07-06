import { Component } from '@angular/core';
import { CONCIERGE_DATA } from './conceirge-services.data';

@Component({
  selector: 'app-conceirge-services',
  templateUrl: './conceirge-services.component.html',
  styleUrls: ['./conceirge-services.component.scss']
})
export class ConceirgeServicesComponent {
  title: string = 'Conceir';
  headerName : string = 'transparant';

  CONCIERGE_DATA = CONCIERGE_DATA;
  
  constructor(){
    this.title = 'Conceirge Services';
  }
  
}

import { Component } from '@angular/core';
import { ModalManagerService } from 'src/app/services/modal-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  headerName:any="Home"
  constructor(
    private mms: ModalManagerService
  ) {

  }
  ngOnInit() {
  }

  toggleMenu () {
    this.mms.topMenuModal({id: 0}).subscribe((res: any) => {      
      
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment'; // Import the environment

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { // Implement OnInit
  title = 'staymaster_ui';

  ngOnInit() {
    console.log('Current API URL:', environment.apiUrl);
  }
}

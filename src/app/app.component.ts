import { Component, OnInit } from '@angular/core';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storageService: StorageService) { }

  ngOnInit() {
    // Example user profile data
    const exampleProfile = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890'
    };
    this.storageService.setUserProfile(exampleProfile);
  }
}

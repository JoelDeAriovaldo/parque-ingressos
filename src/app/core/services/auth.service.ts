import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService) { }

  register(username: string, email: string, password: string): boolean {
    const userProfile = { username, email, password };
    this.storageService.setUserProfile(userProfile);
    return true;
  }

  login(email: string, password: string): boolean {
    const userProfile = this.storageService.getUserProfile();
    if (userProfile && userProfile.email === email && userProfile.password === password) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.storageService.removeItem('currentUser');
  }
}

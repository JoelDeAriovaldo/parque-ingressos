import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService) { }

  login(email: string, password: string): boolean {
    const user = this.storageService.getItem(email);
    if (user && user.password === password) {
      this.storageService.setItem('currentUser', user);
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string): boolean {
    const user = { name, email, password };
    this.storageService.setItem(email, user);
    return true;
  }

  logout(): void {
    this.storageService.removeItem('currentUser');
  }
}

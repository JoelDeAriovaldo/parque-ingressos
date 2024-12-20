import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  addPurchase(purchase: any): void {
    const purchases = this.getPurchaseHistory();
    purchases.push(purchase);
    this.setItem('purchaseHistory', purchases);
  }

  getPurchaseHistory(): any[] {
    return this.getItem('purchaseHistory') || [];
  }

  setUserProfile(profile: any): void {
    this.setItem('userProfile', profile);
  }

  getUserProfile(): any {
    return this.getItem('userProfile');
  }

  clearUserData(): void {
    this.removeItem('userProfile');
    this.removeItem('purchaseHistory');
  }
}

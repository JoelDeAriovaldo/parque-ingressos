import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.page.html',
  styleUrls: ['./purchase-history.page.scss'],
})
export class PurchaseHistoryPage implements OnInit {

  purchaseHistory: any[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.purchaseHistory = this.storageService.getPurchaseHistory();
  }
}

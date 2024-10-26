import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PaymentService } from '../../core/services/payment.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket-purchase.page.html',
  styleUrls: ['./ticket-purchase.page.scss'],
})
export class TicketPurchasePage implements OnInit {

  ticketQuantity: number = 1;
  ticketPrice: number = 20;
  totalPrice: number = this.ticketPrice;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private paymentService: PaymentService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }

  onQuantityChange(event: any) {
    this.ticketQuantity = event.target.value;
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.ticketQuantity * this.ticketPrice;
  }

  async processPayment() {
    const success = await this.paymentService.processPayment(this.totalPrice);

    if (success) {
      this.storageService.addPurchase({
        date: new Date(),
        quantity: this.ticketQuantity,
        total: this.totalPrice
      });

      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Your purchase was successful!',
        buttons: ['OK']
      });

      await alert.present();

      this.router.navigate(['/purchase-history']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Payment failed. Please try again.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
}

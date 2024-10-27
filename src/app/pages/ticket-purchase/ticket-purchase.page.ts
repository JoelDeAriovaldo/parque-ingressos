import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PaymentService } from '../../core/services/payment.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket-purchase.page.html',
  styleUrls: ['./ticket-purchase.page.scss'],
})
export class TicketPurchasePage implements OnInit {
  eventDetails = {
    name: 'Festival de Verão 2024',
    date: new Date('2024-12-31T20:00:00'),
    location: 'Praia do Tofo, Inhambane',
    image: 'assets/event-image.jpg',
    availableTickets: 250
  };

  ticketQuantity: number = 1;
  ticketPrice: number = 750;
  serviceFee: number = 50;
  totalPrice: number = 0;
  selectedPaymentMethod: string = 'mpesa';
  acceptedTerms: boolean = false;
  isProcessing: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private paymentService: PaymentService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.calculateTotalPrice();
  }

  increaseQuantity() {
    if (this.ticketQuantity < 10) {
      this.ticketQuantity++;
      this.calculateTotalPrice();
    }
  }

  decreaseQuantity() {
    if (this.ticketQuantity > 1) {
      this.ticketQuantity--;
      this.calculateTotalPrice();
    }
  }

  onQuantityChange(event: any) {
    const value = parseInt(event.target.value);
    if (value < 1) {
      this.ticketQuantity = 1;
    } else if (value > 10) {
      this.ticketQuantity = 10;
    } else {
      this.ticketQuantity = value;
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    const subtotal = this.ticketQuantity * this.ticketPrice;
    this.totalPrice = subtotal + this.serviceFee;
  }

  async showTerms() {
    const alert = await this.alertController.create({
      header: 'Termos e Condições',
      message: 'Aqui vão os termos e condições detalhados da compra...',
      buttons: ['OK']
    });
    await alert.present();
  }

  async processPayment() {
    if (!this.acceptedTerms) {
      this.showError('Por favor, aceite os termos e condições para continuar.');
      return;
    }

    this.isProcessing = true;
    const loading = await this.loadingController.create({
      message: 'Processando pagamento...'
    });
    await loading.present();

    try {
      const success = await this.paymentService.processPayment({
        amount: this.totalPrice,
        method: this.selectedPaymentMethod,
        quantity: this.ticketQuantity
      });

      await loading.dismiss();
      this.isProcessing = false;

      if (success) {
        const qrCode = this.generateQrCode();
        await this.savePurchase(qrCode);
        this.showSuccess();
      } else {
        this.showError('Falha no pagamento. Por favor, tente novamente.');
      }
    } catch (error) {
      await loading.dismiss();
      this.isProcessing = false;
      this.showError('Ocorreu um erro. Por favor, tente novamente.');
    }
  }

  private async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Compra Realizada!',
      message: 'Seus ingressos foram comprados com sucesso. Você pode visualizá-los no histórico de compras.',
      buttons: [
        {
          text: 'Ver Ingressos',
          handler: () => {
            this.router.navigate(['/purchase-history']);
          }
        }
      ]
    });
    await alert.present();
  }

  private async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  private generateQrCode(): string {
    const purchaseData = {
      timestamp: Date.now(),
      eventId: 'EVENT-2024',
      quantity: this.ticketQuantity,
      total: this.totalPrice,
      purchaseId: `TICKET-${Date.now()}`
    };
    return JSON.stringify(purchaseData);
  }

  private async savePurchase(qrCode: string) {
    await this.storageService.addPurchase({
      date: new Date(),
      eventName: this.eventDetails.name,
      quantity: this.ticketQuantity,
      total: this.totalPrice,
      qrCode: qrCode,
      paymentMethod: this.selectedPaymentMethod
    });
  }
}

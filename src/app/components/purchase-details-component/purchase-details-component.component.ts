import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Share } from '@capacitor/share';

interface Purchase {
  eventName: string;
  eventImage?: string;
  date: Date;
  quantity: number;
  total: number;
  qrCode: string;
}

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details-component.component.html',
  styleUrls: ['./purchase-details-component.component.scss'],
  styles: [`
    .error-message {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
    .error-message ion-icon {
      font-size: 48px;
      margin-bottom: 1rem;
    }
  `]
})
export class PurchaseDetailsComponent implements OnInit {
  @Input() purchase!: Purchase;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    if (!this.purchase || !this.purchase.qrCode) {
      console.warn('Purchase data or QR code is missing');
    }
  }

  get qrCodeData(): string {
    return this.purchase ? this.purchase.qrCode : '';
  }

  dismiss() {
    this.modalController.dismiss();
  }

  get isValidPurchase(): boolean {
    return !!this.purchase && !!this.purchase.qrCode;
  }

  async shareTicket() {
    try {
      await Share.share({
        title: `Ingresso para ${this.purchase.eventName}`,
        text: `Comprei ${this.purchase.quantity} ingresso(s) para ${this.purchase.eventName}!`,
        url: this.qrCodeData
      });
    } catch (error) {
      console.error('Error sharing ticket:', error);
    }
  }

  async requestRefund() {
    const alert = await this.alertController.create({
      header: 'Solicitar Reembolso',
      message: 'Tem certeza que deseja solicitar o reembolso deste ingresso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.processRefund();
          }
        }
      ]
    });
    await alert.present();
  }

  private async processRefund() {
    // Implementar lógica de reembolso
    const alert = await this.alertController.create({
      header: 'Solicitação Enviada',
      message: 'Sua solicitação de reembolso foi enviada e será analisada.',
      buttons: ['OK']
    });
    await alert.present();
  }
}

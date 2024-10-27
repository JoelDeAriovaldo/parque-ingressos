import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { PurchaseDetailsComponent } from '../../components/purchase-details-component/purchase-details-component.component';
import { Share } from '@capacitor/share';

interface Purchase {
  id: string;
  eventName: string;
  date: Date;
  quantity: number;
  total: number;
  status: string;
  paymentMethod: string;
  eventImage?: string;
  qrCode: string;
}

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.page.html',
  styleUrls: ['./purchase-history.page.scss'],
})
export class PurchaseHistoryPage implements OnInit {
  purchaseHistory: Purchase[] = [];
  groupedPurchases: Map<string, Purchase[]> = new Map();
  selectedPeriod: string = 'all';
  totalSpent: number = 0;
  totalTickets: number = 0;

  constructor(
    private storageService: StorageService,
    private modalController: ModalController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    console.log('ngOnInit called');
    this.loadPurchases();
  }

  async loadPurchases() {
    console.log('loadPurchases called');
    try {
      this.purchaseHistory = await this.storageService.getPurchaseHistory() ?? [];
      console.log('Purchase history loaded:', this.purchaseHistory);
      this.calculateStatistics();
      this.groupPurchasesByMonth();
      this.filterByPeriod(this.selectedPeriod);
    } catch (error) {
      console.error('Error loading purchases:', error);
    }
  }

  async showPurchaseDetails(purchase: Purchase) {
    const modal = await this.modalController.create({
      component: PurchaseDetailsComponent,
      componentProps: { purchase }
    });
    await modal.present();
  }

  calculateStatistics() {
    console.log('calculateStatistics called');
    this.totalSpent = this.purchaseHistory.reduce((sum, purchase) => sum + (purchase.total ?? 0), 0);
    this.totalTickets = this.purchaseHistory.reduce((sum, purchase) => sum + (purchase.quantity ?? 0), 0);
    console.log('Statistics calculated:', { totalSpent: this.totalSpent, totalTickets: this.totalTickets });
  }

  groupPurchasesByMonth() {
    console.log('groupPurchasesByMonth called');
    this.groupedPurchases.clear();

    this.purchaseHistory.forEach(purchase => {
      const date = new Date(purchase.date);
      const key = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

      if (!this.groupedPurchases.has(key)) {
        this.groupedPurchases.set(key, []);
      }
      this.groupedPurchases.get(key)?.push(purchase);
    });
    console.log('Purchases grouped by month:', this.groupedPurchases);
  }

  getStatusColor(status: string): string {
    console.log('getStatusColor called for status:', status);
    switch (status?.toLowerCase()) {
      case 'válido':
        return 'success';
      case 'usado':
        return 'medium';
      case 'cancelado':
        return 'danger';
      case 'expirado':
        return 'warning';
      default:
        return 'primary';
    }
  }

  async filterPurchases() {
    console.log('filterPurchases called');
    const actionSheet = await this.actionSheetController.create({
      header: 'Filtrar por',
      buttons: [
        {
          text: 'Mais recentes',
          handler: () => {
            this.sortPurchases('date', 'desc');
          }
        },
        {
          text: 'Mais antigos',
          handler: () => {
            this.sortPurchases('date', 'asc');
          }
        },
        {
          text: 'Maior valor',
          handler: () => {
            this.sortPurchases('total', 'desc');
          }
        },
        {
          text: 'Menor valor',
          handler: () => {
            this.sortPurchases('total', 'asc');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async shareTicket(purchase: Purchase) {
    console.log('shareTicket called for purchase:', purchase);
    try {
      await Share.share({
        title: `Ingresso para ${purchase.eventName}`,
        text: `Comprei ${purchase.quantity} ingresso(s) para ${purchase.eventName}!`,
        url: purchase.qrCode
      });
    } catch (error) {
      console.error('Error sharing ticket:', error);
    }
  }

  async requestRefund(purchase: Purchase) {
    console.log('requestRefund called for purchase:', purchase);
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
            this.processRefund(purchase);
          }
        }
      ]
    });
    await alert.present();
  }

  private async processRefund(purchase: Purchase) {
    console.log('processRefund called for purchase:', purchase);
    // Implementar lógica de reembolso
    const alert = await this.alertController.create({
      header: 'Solicitação Enviada',
      message: 'Sua solicitação de reembolso foi enviada e será analisada.',
      buttons: ['OK']
    });
    await alert.present();
  }

  onPeriodChange(event: any) {
    console.log('onPeriodChange called with event:', event);
    this.filterByPeriod(event.detail.value);
  }

  private filterByPeriod(period: string) {
    console.log('filterByPeriod called with period:', period);
    const now = new Date();

    if (period === 'upcoming') {
      this.purchaseHistory = this.purchaseHistory.filter(p => new Date(p.date) > now);
    } else if (period === 'past') {
      this.purchaseHistory = this.purchaseHistory.filter(p => new Date(p.date) < now);
    } else {
      return; // Evite chamar loadPurchases diretamente
    }

    this.groupPurchasesByMonth();
  }

  private sortPurchases(field: keyof Purchase, order: 'asc' | 'desc') {
    console.log('sortPurchases called with field and order:', field, order);
    this.purchaseHistory.sort((a, b) => {
      if (order === 'asc') {
        return (a[field] ?? 0) > (b[field] ?? 0) ? 1 : -1;
      } else {
        return (a[field] ?? 0) < (b[field] ?? 0) ? 1 : -1;
      }
    });
    this.groupPurchasesByMonth();
  }

  async contactSupport() {
    console.log('contactSupport called');
    const alert = await this.alertController.create({
      header: 'Suporte',
      message: 'Como podemos ajudar?',
      buttons: [
        {
          text: 'Chat',
          handler: () => {
            // Implementar chat de suporte
          }
        },
        {
          text: 'Email',
          handler: () => {
            window.location.href = 'mailto:support@example.com';
          }
        }
      ]
    });
    await alert.present();
  }
}

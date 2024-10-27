import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  role?: string;
  location?: string;
  joinDate: Date;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userProfile: UserProfile | null = null;
  isLoading = true;

  constructor(
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadProfile();
  }

  async loadProfile() {
    try {
      this.isLoading = true;
      this.userProfile = await this.storageService.getUserProfile();
    } catch (error) {
      console.error('Error loading profile:', error);
      await this.showToast('Erro ao carregar o perfil', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async editProfile() {
    // Navegar para a página de edição ou abrir modal
    await this.router.navigate(['/profile/edit']);
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Saída',
      message: 'Tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          handler: async () => {
            await this.performLogout();
          }
        }
      ]
    });

    await alert.present();
  }

  async performLogout() {
    const loading = await this.loadingCtrl.create({
      message: 'Saindo...'
    });
    await loading.present();

    try {
      await this.storageService.clearUserData();
      await this.router.navigate(['/login']);
      await this.showToast('Sessão encerrada com sucesso', 'success');
    } catch (error) {
      console.error('Error during logout:', error);
      await this.showToast('Erro ao sair', 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  async tryAgain() {
    await this.loadProfile();
  }

  private async showToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}

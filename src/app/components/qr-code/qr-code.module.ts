import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeComponent } from './qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [QrCodeComponent],
  imports: [
    CommonModule,
    QRCodeModule,
    IonicModule
  ],
  exports: [QrCodeComponent]
})
export class QrCodeComponentModule { }

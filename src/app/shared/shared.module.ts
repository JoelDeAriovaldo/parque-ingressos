import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { IonicModule } from '@ionic/angular';
import { QrCodeComponent } from '../components/qr-code/qr-code.component';

@NgModule({
  declarations: [QrCodeComponent],
  imports: [CommonModule, QRCodeModule, IonicModule],
  exports: [QrCodeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }

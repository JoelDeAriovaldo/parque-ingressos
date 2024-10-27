import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PurchaseDetailsComponent } from './purchase-details-component.component';
import { QrCodeComponentModule } from '../qr-code/qr-code.module';

@NgModule({
  declarations: [PurchaseDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
    QrCodeComponentModule
  ],
  exports: [PurchaseDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchaseDetailsComponentModule { }

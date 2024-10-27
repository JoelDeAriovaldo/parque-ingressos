import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketPurchasePageRoutingModule } from './ticket-purchase-routing.module';

import { TicketPurchasePage } from './ticket-purchase.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketPurchasePageRoutingModule,
    SharedModule
  ],
  declarations: [TicketPurchasePage]
})
export class TicketPurchasePageModule { }

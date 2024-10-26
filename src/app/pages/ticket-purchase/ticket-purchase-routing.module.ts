import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketPurchasePage } from './ticket-purchase.page';

const routes: Routes = [
  {
    path: '',
    component: TicketPurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketPurchasePageRoutingModule {}

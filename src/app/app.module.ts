import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PurchaseDetailsComponent } from './components/purchase-details-component/purchase-details-component.component';
import { SharedModule } from './shared/shared.module';
import { PaymentService } from './core/services/payment.service';
import { StorageService } from './core/services/storage.service';

@NgModule({
  declarations: [AppComponent, PurchaseDetailsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SharedModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PaymentService,
    StorageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PaymentService } from './core/services/payment.service';
import { StorageService } from './core/services/storage.service';
import { PurchaseDetailsComponentModule } from './components/purchase-details-component/purchase-details-component.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    PurchaseDetailsComponentModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PaymentService,
    StorageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

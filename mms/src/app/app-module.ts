import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Sale } from './components/sale/sale';
import { Purchase } from './components/purchase/purchase';
import { Inventory } from './components/inventory/inventory';
import { Product } from './components/product/product';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Report } from './components/report/report';

@NgModule({
  declarations: [
    App,
    Sale,
    Purchase,
    Inventory,
    Product,
    Dashboard,
    Login,
    Report
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }

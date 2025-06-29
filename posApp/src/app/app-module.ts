import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Product } from './components/product/product';
import { Dashboard } from './components/dashboard/dashboard';
import { Inventory } from './components/inventory/inventory';
import { Sales } from './components/sales/sales';
import { Purchase } from './components/purchase/purchase';
import { Reports } from './components/reports/reports';
import { Layout } from './layout/layout';

@NgModule({
  declarations: [
    App,
    Product,
    Dashboard,
    Inventory,
    Sales,
    Purchase,
    Reports,
    Layout
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

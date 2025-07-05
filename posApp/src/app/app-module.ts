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

@NgModule({
  declarations: [
    App,
    Product,
    Dashboard,
    Inventory,
    Sales,
    Purchase,
    Reports
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
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    NgxChartsModule,
//     // other modules...
//   ]
// })

// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';

// @NgModule({
//   imports: [
//     MatToolbarModule,
//     MatSidenavModule,
//     MatListModule,
//     MatIconModule,
//     MatButtonModule,
//     // other modules...
//   ]
// })

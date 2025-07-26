import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Dashboard } from './appface/dashboard/dashboard';
import { Sidebar } from './appface/sidebar/sidebar';
import { Navbar } from './appface/navbar/navbar';
import { NgChartsModule } from 'ng2-charts';



const chartsModule = NgChartsModule;
@NgModule({
  declarations: [
    App,
    Dashboard,
    Sidebar,
    Navbar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   NgChartsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }

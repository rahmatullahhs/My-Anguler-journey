import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './appface/navbar/navbar';
import { Dashboard } from './appface/dashboard/dashboard';
import { Sidebar } from './appface/sidebar/sidebar';
import { Footer } from './appface/footer/footer';

@NgModule({
  declarations: [
    App,
    Navbar,
    Dashboard,
    Sidebar,
    Footer
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

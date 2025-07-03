import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Home } from './pages/home/home';
import { LaptopList } from './pages/laptop-list/laptop-list';
import { AddLaptop } from './pages/add-laptop/add-laptop';
import { EditLaptop } from './pages/edit-laptop/edit-laptop';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { Categories } from './pages/categories/categories';
import { AddCategory } from './pages/add-category/add-category';
import { Orders } from './pages/orders/orders';

@NgModule({
  declarations: [
    App,
    Navbar,
    Home,
    LaptopList,
    AddLaptop,
    EditLaptop,
    Login,
    Register,
    AdminDashboard,
    Categories,
    AddCategory,
    Orders
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

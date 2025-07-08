import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';


import { Home } from './components/dashboard/home/home';
import { Header } from './components/dashboard/header/header';
import { Footer } from './components/dashboard/footer/footer';
import { AdminDashboard } from './components/dashboard/admin-dashboard/admin-dashboard';
import { Register } from './auth/register/register';
import { Userprofile } from './auth/userprofile/userprofile';
import { Login } from './auth/login/login';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Viewallemp } from './hrm/viewallemp/viewallemp';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Addemp } from './hrm/addemp/addemp';
import { Updateemp } from './hrm/updateemp/updateemp';








@NgModule({
  declarations: [
    App,

  
    
    Home,
    AdminDashboard,
    Header,
    Footer,
    Register,
    Userprofile,
    Login,
    Viewallemp,
    Addemp,
    Updateemp,

   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),

provideHttpClient(withFetch())


  ],
  bootstrap: [App]
})
export class AppModule { }

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Viewallemp } from './hrm/viewallemp/viewallemp';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Addemp } from './hrm/addemp/addemp';
import { Updateemp } from './hrm/updateemp/updateemp';

import { AddProduct } from './goods/addproduct/addproduct';
import { Addcustomer } from './crm/addcustomer/addcustomer';
import { Viewallcustomer } from './crm/viewallcustomer/viewallcustomer';
import { Updatecustomer } from './crm/updatecustomer/updatecustomer';
import { Addsupplier } from './supplier/addsupplier/addsupplier';
import { Viewallsupplier } from './supplier/viewallsupplier/viewallsupplier';
import { Updatesupplier } from './supplier/updatesupplier/updatesupplier';

import { Showpurchase } from './purchase/showpurchase/showpurchase';
import { Addpurchase } from './purchase/addpurchase/addpurchase';
import { Addcategory } from './category/addcategory/addcategory';
import { Addbrand } from './brand/addbrand/addbrand';


import { Addorder } from './order/addorder/addorder';
import { Addreturnproduct } from './returnproduct/addreturnproduct/addreturnproduct';
import { Addrepairproduct } from './returnproduct/addrepairproduct/addrepairproduct';
import { Addaccount } from './account/addaccount/addaccount';
import { Addchart } from './account/addchart/addchart';
import { Showreport } from './report/showreport/showreport';








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

      AddProduct,

      Addcustomer,
      Viewallcustomer,
      Updatecustomer,

      Addsupplier,
      Viewallsupplier,
      Updatesupplier,
      
      Showpurchase,
      Addpurchase,


      Addcategory,

      Addbrand,


      Addorder,

      Addreturnproduct,
      Addrepairproduct,

      Addaccount,

      Addchart,

      Showreport



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

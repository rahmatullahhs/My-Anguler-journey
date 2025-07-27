import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './appface/navbar/navbar';
import { Dashboard } from './appface/dashboard/dashboard';
import { Sidebar } from './appface/sidebar/sidebar';
import { Footer } from './appface/footer/footer';



import { AddgoodComponent } from './buygoods/goods/addgood.component/addgood.component';
import { ViewgoodComponent } from './buygoods/goods/viewgood.component/viewgood.component';
import { UpdategoodComponent } from './buygoods/goods/updategood.component/updategood.component';
import { AddcatComponent } from './buygoods/category/addcat.component/addcat.component';
import { ViewcatComponent } from './buygoods/category/viewcat.component/viewcat.component';
import { UpdatecatComponent } from './buygoods/category/updatecat.component/updatecat.component';
import { AddbrandComponent } from './buygoods/brand/addbrand.component/addbrand.component';
import { ViewbrandComponent } from './buygoods/brand/viewbrand.component/viewbrand.component';
import { UpdatebrandComponent } from './buygoods/brand/updatebrand.component/updatebrand.component';
import { AddcustomerComponent } from './people/customer/addcustomer.component/addcustomer.component';
import { ViewcustomerComponent } from './people/customer/viewcustomer.component/viewcustomer.component';
import { UpdatecustomerComponent } from './people/customer/updatecustomer.component/updatecustomer.component';
import { UpdatesupplierComponent } from './people/supplier/updatesupplier.component/updatesupplier.component';
import { AddsupplierComponent } from './people/supplier/addsupplier.component/addsupplier.component';
import { ViewsupplierComponent } from './people/supplier/viewsupplier.component/viewsupplier.component';
import { ViewemployeeComponent } from './people/employee/viewemployee.component/viewemployee.component';
import { UpdateemployeeComponent } from './people/employee/updateemployee.component/updateemployee.component';
import { AddemployeeComponent } from './people/employee/addemployee.component/addemployee.component';
import { LoginComponent } from './authentication/login.component/login.component';
import { LogoutComponent } from './authentication/logout.component/logout.component';
import { RegisterComponent } from './authentication/register.component/register.component';
import { UserprofileComponent } from './authentication/profiles/userprofile.component/userprofile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    App,
    Navbar,
    Dashboard,
    Sidebar,
    Footer,


    AddgoodComponent,
    ViewgoodComponent,
    UpdategoodComponent,
    AddcatComponent,
    ViewcatComponent,
    UpdatecatComponent,
    AddbrandComponent,
    ViewbrandComponent,
    UpdatebrandComponent,
    AddcustomerComponent,
    ViewcustomerComponent,
    UpdatecustomerComponent,
    UpdatesupplierComponent,
    AddsupplierComponent,
    ViewsupplierComponent,
    ViewemployeeComponent,
    UpdateemployeeComponent,
    AddemployeeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    ,ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }

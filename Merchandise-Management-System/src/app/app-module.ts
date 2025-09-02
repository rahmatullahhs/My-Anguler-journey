import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { Navbar } from './appface/navbar/navbar';
import { Dashboard } from './appface/dashboard/dashboard';
import { Sidebar } from './appface/sidebar/sidebar';
import { Footer } from './appface/footer/footer';

import { ViewgoodComponent } from './buygoods/goods/viewgood.component/viewgood.component';
import { UpdategoodComponent } from './buygoods/goods/updategood.component/updategood.component';
import { AddcatComponent } from './buygoods/category/addcat.component/addcat.component';
import { AddbrandComponent } from './buygoods/brand/addbrand.component/addbrand.component';
import { AddcustomerComponent } from './people/customer/addcustomer.component/addcustomer.component';
import { ViewcustomerComponent } from './people/customer/viewcustomer.component/viewcustomer.component';
import { UpdatecustomerComponent } from './people/customer/updatecustomer.component/updatecustomer.component';
import { UpdatesupplierComponent } from './people/supplier/updatesupplier.component/updatesupplier.component';
import { AddsupplierComponent } from './people/supplier/addsupplier.component/addsupplier.component';
import { ViewsupplierComponent } from './people/supplier/viewsupplier.component/viewsupplier.component';
import { ViewemployeeComponent } from './people/employee/viewemployee.component/viewemployee.component';
import { UpdateemployeeComponent } from './people/employee/updateemployee.component/updateemployee.component';
import { AddemployeeComponent } from './people/employee/addemployee.component/addemployee.component';

import { UserprofileComponent } from './authentication/profiles/userprofile.component/userprofile.component';
import { LoginComponent } from './authentication/login.component/login.component';
import { RegisterComponent } from './authentication/register.component/register.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AddgoodComponent } from './buygoods/goods/addgood.component/addgood.component';
import { AddproductComponent } from './sellProducts/products/addproduct.component/addproduct.component';
import { UpdateproductComponent } from './sellProducts/products/updateproduct.component/updateproduct.component';
import { ViewproductComponent } from './sellProducts/products/viewproduct.component/viewproduct.component';
import { AddcartComponent } from './sellProducts/cart/addcart.component/addcart.component';

import { FaqComponents } from './help-supports/faq.components/faq.components';
import { SupportComponents } from './help-supports/support.components/support.components';
import { KbComponents } from './help-supports/kb.components/kb.components';
import { AddCogsComponent } from './Accounts/COGS/add-cogs.component/add-cogs.component';
import { AddinvoiceComponent } from './sellProducts/Invoice/addinvoice.component/addinvoice.component';
import { SellsaccountsComponent } from './Accounts/Sells/sellsaccounts.component/sellsaccounts.component';
import { ProductspriceComponent } from './Accounts/COGS/productsprice.component/productsprice.component';
import { ViewinvoiceComponent } from './sellProducts/Invoice/viewinvoice.component/viewinvoice.component';
import { AddexpenseComponent } from './Accounts/Expenses/addexpense.component/addexpense.component';
import { ViewexpenseComponent } from './Accounts/Expenses/viewexpense.component/viewexpense.component';
import { UpdateexpenseComponent } from './Accounts/Expenses/updateexpense.component/updateexpense.component';
import { AddexpensefieldComponent } from './Accounts/Expenses/addexpensefield.component/addexpensefield.component';
import { Sellpage } from './appface/dashboard/sellpage/sellpage';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DuelistComponent } from './Accounts/Sells/duelist.component/duelist.component';






Chart.register(ChartDataLabels); 
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
    AddbrandComponent,


    AddcustomerComponent,
    ViewcustomerComponent,
    UpdatecustomerComponent,

    UpdatesupplierComponent,
    AddsupplierComponent,
    ViewsupplierComponent,

    ViewemployeeComponent,
    UpdateemployeeComponent,
    AddemployeeComponent,

    UserprofileComponent,
    RegisterComponent,
    LoginComponent,
    
    AddproductComponent,
    UpdateproductComponent,
    ViewproductComponent,
    AddcartComponent,
    FaqComponents,
    SupportComponents,
    KbComponents,
    AddCogsComponent,
    AddinvoiceComponent,
    SellsaccountsComponent,
    ProductspriceComponent,
    ViewinvoiceComponent,
    AddexpenseComponent,
    ViewexpenseComponent,
    UpdateexpenseComponent,
    AddexpensefieldComponent,
    Sellpage,
DuelistComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,

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
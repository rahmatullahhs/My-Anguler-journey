import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './appface/dashboard/dashboard';
import { ViewcustomerComponent } from './people/customer/viewcustomer.component/viewcustomer.component';
import { ViewsupplierComponent } from './people/supplier/viewsupplier.component/viewsupplier.component';
import { ViewemployeeComponent } from './people/employee/viewemployee.component/viewemployee.component';
import { AddemployeeComponent } from './people/employee/addemployee.component/addemployee.component';
import { UserprofileComponent } from './authentication/profiles/userprofile.component/userprofile.component';
import { LoginComponent } from './authentication/login.component/login.component';
import { RegisterComponent } from './authentication/register.component/register.component';
import { AddbrandComponent } from './buygoods/brand/addbrand.component/addbrand.component';
import { AddcatComponent } from './buygoods/category/addcat.component/addcat.component';
import { AddgoodComponent } from './buygoods/goods/addgood.component/addgood.component';
import { ViewgoodComponent } from './buygoods/goods/viewgood.component/viewgood.component';
import { UpdategoodComponent } from './buygoods/goods/updategood.component/updategood.component';
import { AddcustomerComponent } from './people/customer/addcustomer.component/addcustomer.component';
import { UpdatecustomerComponent } from './people/customer/updatecustomer.component/updatecustomer.component';
import { AddsupplierComponent } from './people/supplier/addsupplier.component/addsupplier.component';
import { UpdatesupplierComponent } from './people/supplier/updatesupplier.component/updatesupplier.component';
import { UpdateemployeeComponent } from './people/employee/updateemployee.component/updateemployee.component';
import { AddproductComponent } from './sellProducts/products/addproduct.component/addproduct.component';
import { ViewproductComponent } from './sellProducts/products/viewproduct.component/viewproduct.component';
import { UpdateproductComponent } from './sellProducts/products/updateproduct.component/updateproduct.component';
import { FaqComponents } from './help-supports/faq.components/faq.components';
import { SupportComponents } from './help-supports/support.components/support.components';
import { KbComponents } from './help-supports/kb.components/kb.components';
import { AddCogsComponent } from './Accounts/COGS/add-cogs.component/add-cogs.component';
import { AddinvoiceComponent } from './sellProducts/Invoice/addinvoice.component/addinvoice.component';
import { ProductspriceComponent } from './Accounts/COGS/productsprice.component/productsprice.component';
import { ViewinvoiceComponent } from './sellProducts/Invoice/viewinvoice.component/viewinvoice.component';
import { DuelistComponent } from './Accounts/Sells/duelist.component/duelist.component';
import { AddResellStockComponent } from './ReturnDamage/ReSellStock/add-resell-stock.component/add-resell-stock.component';
import { AddReplaceUnitComponent } from './ReturnDamage/RePlaceUnit/add-replace-unit.component/add-replace-unit.component';
import { AddReturnProductComponent } from './ReturnDamage/ReturnProduct/add-return-product.component/add-return-product.component';
import { ViewResellStockComponent } from './ReturnDamage/ReSellStock/view-resell-stock.component/view-resell-stock.component';
import { ViewReplaceUnitComponent } from './ReturnDamage/RePlaceUnit/view-replace-unit.component/view-replace-unit.component';
import { ViewReturnProductComponent } from './ReturnDamage/ReturnProduct/view-return-product.component/view-return-product.component';





const routes: Routes = [

  { path: '', component: Dashboard },

  { path: 'userprofile', component: UserprofileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'addcustomer', component: AddcustomerComponent },
  { path: 'updatecustomer', component: UpdatecustomerComponent },
  { path: 'viewcustomer', component: ViewcustomerComponent },

  { path: 'viewsupplier', component: ViewsupplierComponent },
  { path: 'addsupplier', component: AddsupplierComponent },
  { path: 'updatesupplier/:id', component: UpdatesupplierComponent },

  { path: 'viewemp', component: ViewemployeeComponent },
  { path: 'addemp', component: AddemployeeComponent },
  { path: 'updateemp/:id', component: UpdateemployeeComponent },

  { path: 'addbrand', component: AddbrandComponent },
  { path: 'addcategory', component: AddcatComponent },

  { path: 'addgoods', component: AddgoodComponent },
  { path: 'viewgoods', component: ViewgoodComponent },
  { path: 'updategoods/:id', component: UpdategoodComponent },
  
  { path: 'addproduct', component: AddproductComponent },
  { path: 'viewproduct', component: ViewproductComponent },
  { path: 'updateproduct', component: UpdateproductComponent },
  {path:'invoice',component:AddinvoiceComponent},
  {path: 'faq',component:FaqComponents},
  {path:'support',component:SupportComponents},
  {path:'kb',component:KbComponents},
  {path:'cogs',component:AddCogsComponent},
    {path:'productprice',component:ProductspriceComponent},
      {path:'viewinvoice',component:ViewinvoiceComponent},
      {path:'due',component:DuelistComponent},


   {path:'addresellstock',component:AddResellStockComponent},
     {path:'addreplaceUnit',component:AddReplaceUnitComponent},
       {path:'addreturnProduct',component:AddReturnProductComponent},


   {path:'viewresellstock',component:ViewResellStockComponent},
     {path:'viewreplaceUnit',component:ViewReplaceUnitComponent},
       {path:'viwereturnProduct',component:ViewReturnProductComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

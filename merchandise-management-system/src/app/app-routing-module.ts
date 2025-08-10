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
import { ViewbrandComponent } from './buygoods/brand/viewbrand.component/viewbrand.component';
import { ViewcatComponent } from './buygoods/category/viewcat.component/viewcat.component';
import { UpdatecatComponent } from './buygoods/category/updatecat.component/updatecat.component';
import { UpdatebrandComponent } from './buygoods/brand/updatebrand.component/updatebrand.component';
import { ViewgoodsComponent } from './buygoods/goods/viewgoods.component/viewgoods.component';
import { AddgoodsComponent } from './buygoods/goods/addgoods.component/addgoods.component';
import { UpdategoodsComponent } from './buygoods/goods/updategoods.component/updategoods.component';
import { UpdatecustomerComponent } from './people/customer/updatecustomer.component/updatecustomer.component';
import { AddcustomerComponent } from './people/customer/addcustomer.component/addcustomer.component';
import { UpdateemployeeComponent } from './people/employee/updateemployee.component/updateemployee.component';
import { AddsupplierComponent } from './people/supplier/addsupplier.component/addsupplier.component';
import { UpdatesupplierComponent } from './people/supplier/updatesupplier.component/updatesupplier.component';


const routes: Routes = [

  { path: '', component: Dashboard },


 //  user
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  //  employee
  { path: 'viewEmp', component: ViewemployeeComponent },
  { path: 'addEmp', component: AddemployeeComponent },
  { path: 'updateEmp', component: UpdateemployeeComponent },
  //  Brand
  { path: 'addbrand', component: AddbrandComponent },
  { path: 'viewbrand', component: ViewbrandComponent },
  { path: 'updatebrand/:id', component: UpdatebrandComponent },
  //  Category
  { path: 'addcategory', component: AddcatComponent },
  { path: 'viewcategory', component: ViewcatComponent },
  { path: 'updatecatagory/:id', component: UpdatecatComponent },
  //  Goods
  { path: 'addgoods', component: AddgoodsComponent },
  { path: 'viewgoods', component: ViewgoodsComponent },
  { path: 'updategoods/:id', component: UpdategoodsComponent },
  //  Cuatomer
  { path: 'addcustomer', component: AddcustomerComponent },
  { path: 'updatecustomer/:id', component: UpdatecustomerComponent },
  { path: 'viewcustomer', component: ViewcustomerComponent },
  //  Supplier
  { path: 'addsupplier', component: AddsupplierComponent },
  { path: 'viewsupplier', component: ViewsupplierComponent },
  { path: 'updatesupplier', component: UpdatesupplierComponent }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

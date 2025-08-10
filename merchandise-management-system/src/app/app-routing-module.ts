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


const routes: Routes = [

  { path: '', component: Dashboard },
  { path: 'viewcustomer', component: ViewcustomerComponent },
  { path: 'viewsupplier', component: ViewsupplierComponent },
  { path: 'viewEmp', component: ViewemployeeComponent },
  { path: 'addEmp', component: AddemployeeComponent },

  { path: 'userprofile', component: UserprofileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'addbrand', component: AddbrandComponent },
  { path: 'viewbrand', component: ViewbrandComponent },
  { path: 'updatebrand/:id', component: UpdatebrandComponent },

  { path: 'addcategory', component: AddcatComponent },
  { path: 'viewcategory', component: ViewcatComponent },
  { path: 'updatecatagory/:id', component: UpdatecatComponent },

  { path: 'addgoods', component: AddgoodsComponent },
  { path: 'viewgoods', component: ViewgoodsComponent },
  { path: 'updategoods/:id', component: UpdategoodsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

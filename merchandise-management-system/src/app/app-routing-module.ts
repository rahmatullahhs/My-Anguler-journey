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


const routes: Routes = [

  { path: '', component: Dashboard },
  { path: 'viewcustomer', component: ViewcustomerComponent },
  {path:'viewsupplier', component:ViewsupplierComponent},
  {path:'viewEmp',component:ViewemployeeComponent},
  {path:'addEmp',component:AddemployeeComponent},
  
  {path:'userprofile',component:UserprofileComponent},
  {path:'register',component:RegisterComponent}, 
  {path:'login',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

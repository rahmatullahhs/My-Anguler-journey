import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './appface/dashboard/dashboard';


import { ViewcustomerComponent } from './people/customer/viewcustomer.component/viewcustomer.component';
import { RegisterComponent } from './authentication/register.component/register.component';
import { LoginComponent } from './authentication/login.component/login.component';
import { ViewsupplierComponent } from './people/supplier/viewsupplier.component/viewsupplier.component';
import { ViewemployeeComponent } from './people/employee/viewemployee.component/viewemployee.component';

const routes: Routes = [

  { path: '', component: Dashboard },
  { path: 'viewcustomer', component: ViewcustomerComponent },
  {path:'viewsupplier', component:ViewsupplierComponent},
  {path:'viewemployee',component:ViewemployeeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './appface/dashboard/dashboard';


import { ViewcustomerComponent } from './people/customer/viewcustomer.component/viewcustomer.component';

const routes: Routes = [
{ path:'', component: Dashboard},

  {path:'viewcustomer',component:ViewcustomerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

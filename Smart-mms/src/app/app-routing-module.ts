import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/dashboard/home/home';
import { AdminDashboard } from './components/dashboard/admin-dashboard/admin-dashboard';
import { Footer } from './components/dashboard/footer/footer';
import { Header } from './components/dashboard/header/header';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Viewallemp } from './hrm/viewallemp/viewallemp';
import { Addemp } from './hrm/addemp/addemp';
import { Updateemp } from './hrm/updateemp/updateemp';
import { AddProduct } from './goods/addproduct/addproduct';
import { Viewallcustomer } from './crm/viewallcustomer/viewallcustomer';
import { Updatecustomer } from './crm/updatecustomer/updatecustomer';
import { Addcustomer } from './crm/addcustomer/addcustomer';

import { Addcategory } from './category/addcategory/addcategory';
import { Addbrand } from './brand/addbrand/addbrand';
import { Addpurchase } from './purchase/addpurchase/addpurchase';
import { Addorder } from './order/addorder/addorder';
import { Addsupplier } from './supplier/addsupplier/addsupplier';
import { Addreturnproduct } from './returnproduct/addreturnproduct/addreturnproduct';
import { Addrepairproduct } from './returnproduct/addrepairproduct/addrepairproduct';
import { Addaccount } from './account/addaccount/addaccount';
import { Addchart } from './account/addchart/addchart';
import { Showreport } from './report/showreport/showreport';
import { Viewallsupplier } from './supplier/viewallsupplier/viewallsupplier';
import { Updatesupplier } from './supplier/updatesupplier/updatesupplier';
import { ViewAllstock } from './goods/view-allstock/view-allstock';
import { Ledgerbook } from './account/ledgerbook/ledgerbook';
import { Billstracking } from './account/billstracking/billstracking';
import { Salestracking } from './account/salestracking/salestracking';
import { Cogs } from './account/cogs/cogs';
import { Accountpayentry } from './account/accountpayentry/accountpayentry';
import { Empsalary } from './account/empsalary/empsalary';



const routes: Routes = [

{path: '', component: Home},

{path: 'admindashboard',component:AdminDashboard},
{path:'footer',component:Footer},
{path:'header', component:Header},
{path:'register',component:Register},
{path:'login',component:Login},

{path:'viewallemp',component:Viewallemp},
{path:'addemp',component:Addemp},
{path:'updateEmp/:id',component:Updateemp},


 {path: 'addproduct',component:AddProduct},
 {path:'viewallstock',component:ViewAllstock},
 {path:'ledgerbook',component:Ledgerbook},
 
 {path:'addcategory',component:Addcategory},
 {path: 'addbrand',component:Addbrand},
 
 {path:'viewallcustomer',component:Viewallcustomer},
 {path:'updatecustomer/:id',component:Updatecustomer},
 {path:'addcustomer',component:Addcustomer},

{path:'addpurchase',component:Addpurchase},
{path:'addorder',component:Addorder},
{path:'addsupplier',component:Addsupplier},
{path:'viewallsupplier',component:Viewallsupplier},
{path:'updatesupplier/:id',component:Updatesupplier},

{path:'addreturnproduct',component:Addreturnproduct},
{path:'addrepairproduct',component:Addrepairproduct},
{path:'addaccount',component:Addaccount},
{path:'addchart',component:Addchart},
{path:'showreport',component:Showreport},



 { path: 'billstracking', component: Billstracking },
  { path: 'salestracking', component: Salestracking },
  { path: 'cogs', component: Cogs },
  { path: 'accountpayentry', component: Accountpayentry },
  { path: 'empsalary', component: Empsalary },








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

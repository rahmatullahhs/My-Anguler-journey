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
import { Viewallproduct } from './goods/viewallproduct/viewallproduct';
import { Updateproduct } from './goods/updateproduct/updateproduct';
import { Addcategory } from './category/addcategory/addcategory';
import { Addbrand } from './brand/addbrand/addbrand';
import { Addpurchase } from './purchase/addpurchase/addpurchase';
import { Addorder } from './order/addorder/addorder';
import { Addsupplier } from './supplier/addsupplier/addsupplier';


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
 {path:'viewallproduct',component:Viewallproduct},
 {path:'updateproduct',component:Updateproduct},
 {path:'addcategory',component:Addcategory},
 {path: 'addbrand',component:Addbrand},
 
 {path:'viewallcustomer',component:Viewallcustomer},
 {path:'updatecustomer/:id',component:Updatecustomer},
 {path:'addcustomer',component:Addcustomer},

{path:'addpurchase',component:Addpurchase},
{path:'addorder',component:Addorder},
{path:'addsupplier',component:Addsupplier}












];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

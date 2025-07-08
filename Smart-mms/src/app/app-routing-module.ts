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

const routes: Routes = [

{path: '', component: Home},
{path: 'admindashboard',component:AdminDashboard},
{path:'footer',component:Footer},
{path:'header', component:Header},
{path:'register',component:Register},
{path:'login',component:Login},
{path:'viewallemp',component:Viewallemp},
{path:'addemp',component:Addemp},
{path:'updateemp',component:Updateemp}
 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

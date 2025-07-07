import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/dashboard/home/home';
import { AdminDashboard } from './components/dashboard/admin-dashboard/admin-dashboard';
import { Footer } from './components/dashboard/footer/footer';
import { Header } from './components/dashboard/header/header';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';

const routes: Routes = [

{path: '', component: Home},
{path: 'admindashboard',component:AdminDashboard},
{path:'footer',component:Footer},
{path:'header', component:Header},
{path:'register',component:Register},
{path:'login',component:Login}


 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

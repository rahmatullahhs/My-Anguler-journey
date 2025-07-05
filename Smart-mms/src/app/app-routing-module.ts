import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/dashboard/home/home';
import { AdminDashboard } from './components/dashboard/admin-dashboard/admin-dashboard';
import { Footer } from './components/dashboard/footer/footer';
import { Header } from './components/dashboard/header/header';

const routes: Routes = [

{path: '', component: Home},
{path: 'admin-dashboard', component: AdminDashboard },
{path: 'footer', component: Footer},
{path:'header', component: Header},


 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

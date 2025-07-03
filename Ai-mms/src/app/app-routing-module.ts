import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [


 { path: '', component: HomeComponent },
  { path: 'laptops', component: LaptopListComponent, canActivate: [AuthGuard] },
  { path: 'add-laptop', component: AddLaptopComponent, canActivate: [AuthGuard] },
  { path: 'edit-laptop/:id', component: EditLaptopComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
{ path: 'add-laptop', component: AddLaptopComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
{ 
  path: 'admin', 
  component: AdminDashboardComponent, 
  canActivate: [AuthGuard, RoleGuard], 
  data: { role: 'admin' } 
}
{ path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
{ path: 'add-category', component: AddCategoryComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },

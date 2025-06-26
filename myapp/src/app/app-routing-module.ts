import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { ViewAllStudent } from './view-all-student/view-all-student';
import { Addstudent } from './addstudent/addstudent';
import { UpdateStudent } from './update-student/update-student';

const routes: Routes = [

{path:'',component:Home},
{path:'allstu', component: ViewAllStudent},
{path: 'addstu', component: Addstudent},
{path: 'updatestudent/:id', component: UpdateStudent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

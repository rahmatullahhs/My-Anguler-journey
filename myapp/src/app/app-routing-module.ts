import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { ViewAllStudent } from './components/student.component/view-all-student/view-all-student';
import { Addstudent } from './components/student.component/addstudent/addstudent';
import { UpdateStudent } from './components/student.component/update-student/update-student';


const routes: Routes = [
// Default/home page. Used when URL path is empty.
{path:'',component:Home},
{path:'allstu',component: ViewAllStudent},
{path: 'addstu', component: Addstudent},
// Updates a specific student — the :id is a route parameter
{path: 'updatestudent/:id', component: UpdateStudent}


];
RouterModule.forRoot(routes)

// Initializes the Angular router using your routes.
// Should only be called once, typically in the root routing module.
// exports: [RouterModule]:
// Makes the configured RouterModule available in other parts of your app, especially AppModule.
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

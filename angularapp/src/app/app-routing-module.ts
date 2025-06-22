import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Allemp } from './allemp/allemp';
import { Addemployee } from './addemployee/addemployee';

const routes: Routes = [
{path: '',component:Home},
{path: 'about',component:About},
{path: 'allemp',component:Allemp},
{path:'addemployee',component:Addemployee}

];                                                                                                                                                                                                                                    

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

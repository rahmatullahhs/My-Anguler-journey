import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { AddEmp } from './add-emp/add-emp';
import { ViewAllEmp } from './view-all-emp/view-all-emp';
import { StudentService } from './service/student.service/student.service';
import { StudentModel } from './model/student.model/student.model';

@NgModule({
  declarations: [
    App,
    Home,
    AddEmp,
    ViewAllEmp,
    StudentService,
    StudentModel
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }

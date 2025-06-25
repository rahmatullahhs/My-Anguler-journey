import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { ViewAllStudent } from './view-all-student/view-all-student';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Addstudent } from './addstudent/addstudent';
import { UpdateStudent } from './update-student/update-student';

@NgModule({
  declarations: [
    App,
    Home,
    ViewAllStudent,
    Addstudent,
    UpdateStudent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [App]
})
export class AppModule { }

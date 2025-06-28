import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected title = 'myapp';
}
// selector, templateUrl, and styleUrls configure how Angular invokes and renders the component.
// standalone: false means this must be declared inside an NgModule.
// The App class defines your component logic and data.
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  protected title = 'myapp';
}
// selector, templateUrl, and styleUrls configure how Angular invokes and renders the component.
// standalone: false means this must be declared inside an NgModule.
// The App class defines your component logic and data.

// userRole: string | null ='';
// currentUser: UserModel |null = null;

// constructor(

// private authService =authservice

// )
// administrato
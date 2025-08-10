import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Merchandise-Management-System');

  isSidebarCollapsed = true;



  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}







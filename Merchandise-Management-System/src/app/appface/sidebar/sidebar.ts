import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
toggleSidebar() {
throw new Error('Method not implemented.');
}
@Input() collapsed = false;
isMobile(): boolean {
  return window.innerWidth < 768;
}

}

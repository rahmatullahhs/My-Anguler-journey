import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: false, 
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  @Input() collapsed = true;

  toggleSidebar() {
    throw new Error('Method not implemented.');
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }
}

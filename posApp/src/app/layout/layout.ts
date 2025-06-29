import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
})
export class LayoutComponent {
  isSidenavOpen = true;
}

}

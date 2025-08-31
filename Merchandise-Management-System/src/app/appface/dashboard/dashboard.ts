import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
 userName = 'Rahmat Ullah';
  project = {
    name: 'My Project Work Tracking',
    completedPercent: 42
  };
}

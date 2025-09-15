import { Component } from '@angular/core';

@Component({
  selector: 'app-sellpage',
  standalone: false,
  templateUrl: './sellpage.html',
  styleUrl: './sellpage.css'
})
export class Sellpage {
 userName = 'Rahmat Ullah';
  project = {
    name: 'My Project Work Tracking',
    completedPercent: 42
  };
}

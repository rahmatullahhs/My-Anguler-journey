import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CogsModel } from '../../../models/Accounts/cogs.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CogsService } from '../../../service/Accounts/cogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewcogs.component',
  standalone: false,
  templateUrl: './viewcogs.component.html',
  styleUrl: './viewcogs.component.css'
})
export class ViewcogsComponent implements OnInit {

  cogsList: CogsModel[] = [];

  constructor(private cogsService: CogsService, private router: Router) {}

  ngOnInit(): void {
    this.loadCogs();
  }

  loadCogs() {
    this.cogsService.getAllCogs().subscribe(data => {
      this.cogsList = data;
    });
  }

  editCogs(cogs: CogsModel) {
    // Navigate to AddCogsComponent and pass the data
    this.router.navigate(['/add-cogs'], { state: { cogsData: cogs } });
  }

  deleteCogs(id: number) {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.cogsService.deleteCogs(id).subscribe(() => {
        this.loadCogs();
      });
    }
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../../models/goods/category.model';
import { CategoryService } from '../../../service/buygood/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatecat.component',
  standalone: false,
  templateUrl: './updatecat.component.html',
  styleUrl: './updatecat.component.css'
})
export class UpdatecatComponent implements OnInit {


id!:string;
category!: CategoryModel
constructor(
  private categoryService: CategoryService,
  private router:Router,
  private activeRoute:ActivatedRoute,
  private cdr:ChangeDetectorRef
){}
 ngOnInit(): void {
   this.loadAllCategory();
 }

loadAllCategory():void{
 this.id = this.activeRoute.snapshot.params['id'];

    this.categoryService.getCategoryById(this.id).subscribe({
      next: (res) => {
        this.category = res;
        this.cdr.markForCheck();
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateCategory():void {
    this.categoryService.updateCategory(this.category).subscribe({
      next: () => {
        this.router.navigate(['/viewallemp'])
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from '../../service/sale-product/item.service';
import { Router } from '@angular/router';
import { Item } from '../../models/products/item.model';

@Component({
  selector: 'app-item-component',
  standalone: false,
  templateUrl: './item-component.html',
  styleUrl: './item-component.css'
})
export class ItemComponent implements OnInit{

  item: any;
  formItem!: FormGroup;

   constructor(
    private itemService: ItemService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef 
  ){}
  ngOnInit(): void {
     this.formItem = this.formBuilder.group({
       name :['']
  
    });

    this.loadAllItem();
  }


  addItem(): void {
          const item : Item = {...this.formItem.value};
          this.itemService.saveItem(item).subscribe({
        
            next: (res) => {
        
              console.log(res,'Added Succesfully');
              this.formItem.reset();
              this.router.navigate(['/viewAllItem']);
        
            },
            error: (err) => {
              console.log(err,'Data Not Saved ! Please Check Console')
        
            }
        
        
        
          });
          }

            loadAllItem(){
this.item = this.itemService.getAllItem();


  }

}

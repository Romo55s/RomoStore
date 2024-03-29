import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html' 
})
export class FiltersComponent implements OnInit, OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  categories : Array<string> | undefined;

  constructor(private storeServices: StoreService){}

  ngOnInit(): void{
    this.categoriesSubscription = this.storeServices.getAllCategories()
      .subscribe((response) =>{
        this.categories = response;
      });
  }

  onShowCategory(category: string) : void{
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    }
  } 
}

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: 'products-header.component.html'
})

export class ProductsHeaderComponent {
  // Se madan datos a los padres
  @Output() columnsCountChange = new EventEmitter <number>();// El numero de columans que se va utilizar
  @Output() itemsCountChange = new EventEmitter <number>();
  @Output() sortChange = new EventEmitter <string>();

  itemsShowCount = 12;
  sort = 'desc';

  onSortUpdated(newSort: string): void{
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onItemsUpdated(count: number): void{
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsUpdated(colusNum: number) : void{
    this.columnsCountChange.emit(colusNum);
  }
}

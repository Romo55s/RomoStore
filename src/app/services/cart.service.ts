import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items: []});
  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void{
    // Creamos una copia de la matriz actual de elementos del carrito
    const items = [...this.cart.value.items];

    const itemsInCart = items.find((_item) => _item.id === item.id);

    if(itemsInCart){
      itemsInCart.quantity += 1;
    }else{
      items.push(item);
    }

    this.cart.next({ items});
    this._snackBar.open('1 item added to cart.','Ok',{duration: 3000});
  }

  // Esta función recibe un array de objetos de tipo CartItem y devuelve el total de la compra
  getTotal(items: Array<CartItem>): number {
    return items.
      map((item) => item.price * item.quantity) // Por cada elemento en el array, multiplicamos el precio por la cantidad y obtenemos un array de subtotales
      .reduce((prev, current) => prev + current, 0) // Sumamos todos los subtotales para obtener el total, empezando en 0 como valor inicial
  }

  clearCart(): void{
    this.cart.next({items: []});
    this._snackBar.open('Cart is cleard', 'Ok', {duration: 3000});
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem>{
    const filterdItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if(update){
      this.cart.next({items: filterdItems});
      this._snackBar.open('1 item removed form cart.','Ok',{duration: 3000});  
    }

    return  filterdItems;
  }

  removeQuantity(item: CartItem): void{
    let itemForRemoval: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if(_item.id === item.id){
        _item.quantity--;
        if(_item.quantity === 0){
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if(itemForRemoval){
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({items: filteredItems});
    this._snackBar.open('1 item removed form cart','Ok',{duration: 3000});

  }
}
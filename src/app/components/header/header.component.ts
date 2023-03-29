import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    // Calculamos la cantidad de elementos en el carrito
    this.itemsQuantity = cart.items
      // Obtenemos un array con las cantidades de cada elemento
      .map((item) => item.quantity)
      // Sumamos las cantidades de todos los elementos
      .reduce((prev, current) => prev + current, 0)
  }

  constructor(private cartService: CartService) { }

  // Esta función recibe un array de objetos de tipo CartItem y devuelve el total de la compra
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(){
    this.cartService.clearCart();
  }

}
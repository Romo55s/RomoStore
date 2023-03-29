import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { async } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  cart: Cart = {
    items: [{
      product: 'https://via.placeholder.com/150',
      name: 'Ridell II',
      price: 150,
      quantity: 1,
      id: 1
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'Ridell I',
      price: 120,
      quantity: 3,
      id: 2
    }]
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];
  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart : Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  constructor(private cartService: CartService, private http: HttpClient) { }

  // Esta función recibe un array de objetos de tipo CartItem y devuelve el total de la compra
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void{
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void{
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void{
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void{
    this.cartService.removeQuantity(item);
  }

  onCheckOut(): void{
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any) =>{
      let stripe = await loadStripe('pk_test_51Mq9YfHwFHyJ01Mx9Rj3zzYkcpaSL8tZq963O1xMArOOz9sWZVVB3CiSi0HNjaoglhQubLBy3piUfHL8l0ZovlYU009oDUvkAY');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    });
  }
}

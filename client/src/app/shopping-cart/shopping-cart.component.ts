import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShoppingCartService} from '../shopping-cart.service';
import {Item} from '../model/item.interface';

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit{
  // TODO: À compléter
  items: any [] = [];
  constructor(private http: HttpClient, private cart: ShoppingCartService){}

  ngOnInit(){
    this.getItemsOfShoppingCart();
  }

  getItemsOfShoppingCart(): void {
    this.cart.getItems()
      .subscribe(retrievedItems => {
          console.log(retrievedItems);
          this.items.push(retrievedItems);
        },
        (err: any) => console.log('Getting items failed'),
        () => console.log('retrieving items of the shopping-cart')
      );
  }
}

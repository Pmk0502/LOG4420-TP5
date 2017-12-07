import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShoppingCartService} from '../shopping-cart.service';
import {Item} from '../model/item.interface';
import {ProductsService} from '../products.service';

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {
  // TODO: À compléter
  items: Item [] = [];
  _items: Item[] = [];
  _products: any = [];
  id: number;

  constructor(private http: HttpClient, private cart: ShoppingCartService, private productService: ProductsService) {
  }

  ngOnInit() {
    this.getItemsOfShoppingCart();
  }

  getItemsOfShoppingCart(): void {
    this.cart.getItems()
      .subscribe(
        (retrievedItems) => {
          this.items = retrievedItems;
          this.items.forEach(itemFound => {
            this.id = +itemFound.productId;
            this.getCorrespondingProduct(this.id)
              .then(p => {
                  var item = {'name': p.name, 'price': p.price, 'quantity': itemFound.quantity, 'total': p.price * +itemFound.quantity};
                  this._products.push(item);
                }
              )
          })
        },
        (err: any) => console.log('Getting items failed'),
        () => console.log('retrieving items of the shopping-cart')
      );
  }

  removeItemFromShoppingCart(){
    this.cart.removeItem(this.id)
      .subscribe(
        this._products.splice(this._products.indexOf(this._products[this.id]), 1)
    );

  }
  getCorrespondingProduct(id: number) {
    this._products = [];
    return this.productService.getProduct(id);
  }
}

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
  _products;
  id: number;
  quantity: number;

  constructor(private http: HttpClient, private cart: ShoppingCartService, private productService: ProductsService) {
    this._products = [];
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
            this.getCorrespondingProduct(+itemFound.productId)
              .then(p => {
                  var item = {'productId': p.id,'name': p.name, 'price': p.price, 'quantity': +itemFound.quantity, 'total': p.price * +itemFound.quantity};
                  this._products.push(item);
                  this.shoppingCartSorter(this._products);

                }
              )
          })
        },
        (err: any) => console.log('Getting items failed'),
        () => console.log('retrieving items of the shopping-cart')
      );
  }

  increaseItemQuantity(item: any){

    this.cart.updateQuantity(item.productId, item.quantity+1).subscribe();
    this._products[this._products.indexOf(item)].quantity = item.quantity+1;

  }

  decreaseItemQuantity(item: any){
    this.cart.updateQuantity(item.productId, item.quantity-1).subscribe();
    this._products[this._products.indexOf(item)].quantity = item.quantity-1;
  }

  removeItemFromShoppingCart(item: any){
    this.cart.removeItem(item.id).subscribe();
    this._products.splice(this._products.indexOf(item, 1));
  }
  getCorrespondingProduct(id: number) {
    return this.productService.getProduct(id);
  }

  removeAllItems(){
    this.cart.removeAll().subscribe();
    this._products = [];
  }


  shoppingCartSorter(items: any){
    items = items.sort(function(a, b) {
      var nameA = a["name"].toLowerCase();
      var nameB = b["name"].toLowerCase();
      if (nameA > nameB) {
        return 1;
      } else if (nameA < nameB) {
        return -1;
      }
      return 0;
    });
  }
}

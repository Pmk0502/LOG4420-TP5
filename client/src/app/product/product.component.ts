import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductsService} from '../products.service';
import {ShoppingCartService} from '../shopping-cart.service';
import {Item} from '../model/item.interface';
import 'rxjs/add/operator/map';

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  added: number = 0;
  product: Product;
  features: string[];
  quantity: number;
  productId: number;
  shoppingCartItems: Item[] = [];
  _items: any[];


  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private cart: ShoppingCartService, private route: ActivatedRoute, private productsService: ProductsService) {
  }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    let notFound: any[];
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(+this.productId).then((product) => {
      if (!product) {
        this.product = null;
      }
      this.product = product;
    });
  }

  updateShoppingCart() {
    this.cart.getItems().subscribe((items) => {
      this._items = items;
      console.log(items);
      var itemFound = this._items.find((item) => item.productId === this.productId)
      if (itemFound){
        console.log(itemFound);
        this.cart.updateQuantity(this.productId, this.quantity).subscribe();
        this.added = 1;
      }else{
        this.cart.addItem(this.productId, this.quantity).subscribe();
        this.added = 1;
      }
    });
  }
}

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

  product: Product;
  features: string[];
  quantity: number;
  productId: number;
  shoppingCartItems: Item[] = [];

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private shopping: ShoppingCartService, private route: ActivatedRoute, private productsService: ProductsService) {
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

}

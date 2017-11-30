import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Product, ProductsService} from "../products.service";

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

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private route: ActivatedRoute, private productsService: ProductsService) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    let notFound: any[];
    const productId = this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(+productId).then((product) => {
      if(!product){
        this.product = new Product();
        window.location.href = productId;
      }
      this.product = product;
    });
  }
}

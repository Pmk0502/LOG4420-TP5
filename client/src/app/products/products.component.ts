import {Component} from '@angular/core';
import {ProductsService} from "../products.service";
import {Product} from "../products.service";

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  // TODO: À compléter
  criteria: string;
  category: string;
  prods: Product[];
  products: Promise<Product[]>;
  constructor(private pService: ProductsService){
    this.prods = new Array<Product>();
  }

  ngOnInit(){
    this.criteria = "price-asc";
    this.category = "all";
    return this.pService.getProducts(this.criteria, this.category).then((data) => {
      this.prods = data;
      return this.prods;
    });
  }

  getSortedProducts($event){
    this.criteria = $event.target.id;
    this.pService.getProducts(this.criteria, this.category).then((productsRetrieved)=>{
      this.prods = productsRetrieved;
    });
  }

  getProductsByCategory($event){
    this.category = $event.target.id;
    this.pService.getProducts(this.criteria, this.category).then((productsRetrieved)=>{
      this.prods = productsRetrieved;
    });
  }

}

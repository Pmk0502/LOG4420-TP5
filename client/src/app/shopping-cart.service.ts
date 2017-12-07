import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from './config';
import {HttpClient,HttpHeaders, HttpResponse,} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable/throw';
import {Item} from './model/item.interface';


@Injectable()
export class ShoppingCartService {

  items: any[] = [];
  headers = new HttpHeaders({"Content-type":"application/json"});
  options = ({headers: this.headers, withCredentials: true});
  url = `${Config.apiUrl}/shopping-cart/`;

  constructor(private http: HttpClient) {

  }

  /**
   * Get all items from the shopping-cart
   */
  getItems() : Observable<Item[]>  {
    return this.http.get(this.url, this.options);
  }

  /**
   * add an item into shopping-cart
   * @param {Item} item
   */

  addItem(productId:number, quantity:number){
    return this.http.post(this.url, JSON.stringify({ productId: productId, quantity: quantity}), this.options)
        .map(res => res)
    }

  updateQuantity(productId:number, quantity:number){
    return this.http.put(this.url+productId, JSON.stringify({quantity: quantity}), this.options)
      .map(res => res)
  }

  removeItem(productId: number){
      return this.http.delete(this.url+productId, this.options)
        .map(res => res)
  }


  handleError(error: any) {
    console.error('Server Error', error);
    if (error instanceof HttpResponse) {
      let errorMessage = '';
      try {
        errorMessage = error.statusText;
      } catch (error) {
        errorMessage = error.statusText;
      }
      return Observable.throw('Server Error ');

    }
  }
}

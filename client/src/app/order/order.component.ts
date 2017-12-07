import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import {ShoppingCartService} from '../shopping-cart.service';

import {Router} from '@angular/router';
=======
import { OrderService } from '../order.service';
import {Router} from "@angular/router"
>>>>>>> master

declare const $: any;

/**
 * Defines the component responsible to manage the order page.
 */
@Component({
  selector: 'order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: any;
  name:string;

  constructor(private cart: ShoppingCartService, private router: Router){}


  constructor(private orderService: OrderService, public router: Router) { }
  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    // Initializes the validation of the form. This is the ONLY place where jQuery usage is allowed.
    this.orderForm = $('#order-form');
    $.validator.addMethod('ccexp', function(value) {
      if (!value) {
        return false;
      }
      const regEx = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-9][0-9])$/g;
      return regEx.test(value);
    }, 'La date d\'expiration de votre carte de crédit est invalide.');
    this.orderForm.validate({
      rules: {
        'phone': {
          required: true,
          phoneUS: true
        },
        'credit-card': {
          required: true,
          creditcard: true
        },
        'credit-card-expiry': {
          ccexp: true
        }
      }
    });
  }

  /**
   * Submits the order form.
   */
  submit() {
    if (!this.orderForm.valid()) {

      this.cart.removeAll().subscribe();
      this.router.navigate(['confirmation'])

    }
    this.orderService.sendOrder(this.orderForm)
      .subscribe();
    this.router.navigate(['/confirmation']);
  }
}

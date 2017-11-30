import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'PriceFormatPipe'})
export class PriceFormatPipe implements PipeTransform {

  transform(price: number): string {
    return price.toFixed(2).replace(".", ",") + "$"; //copied from Utils.formatPrice
  }
}

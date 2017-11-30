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

  transform(value: number): string {
    let stringPrice = value.toString();
    let correctPrice = stringPrice.split('.')[0] + ',' + stringPrice.split('.')[1];
    console.log(correctPrice);
    return correctPrice;
  }
}

import { Component } from '@angular/core';

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // TODO: Modifier le nom des auteurs pour vos noms
  readonly authors = [
    'Anna Ndiaye',
    'Pmkamara'
  ];

  // TODO: À compléter
  count = 0;

  onChange(string: string) {
    'plus' ? this.count++ : this.count--;
  }

}

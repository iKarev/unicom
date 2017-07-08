import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { ShoppingService } from './services/shopping.service';

@Component({
  selector: 'app-root',
  template: `
  <header class="ut-header">
    <nav class="ut-nav pv_8 layout-row container">
      <div class="flex_10"></div>
      <h4 class="mt_0 ta-c flex_80 ut-header__title" (click)="onGoToStock()">Used cars shop</h4>
      <figure class="relative flex_10 ut-header__cart" (click)="onGoToCart()">
        <i class="fa fa-shopping-cart"></i>
        <span class="absolute ut-header__cart_qty">{{_shoppingService.productsInCart.length}}</span>
      </figure>
    </nav>
  </header>
  <main class="ut-main container">
    <router-outlet></router-outlet>
    <footer class="ut-footer">
      <hr />
      <div>
        <span>© 2017 iKarev</span>
      </div>
    </footer>
  </main>
  `
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, private _shoppingService: ShoppingService) { }

  private onGoToCart () {
    this.router.navigate( ['cart'] );
  }
  private onGoToStock () {
    this.router.navigate( ['stock'] );
  }

}

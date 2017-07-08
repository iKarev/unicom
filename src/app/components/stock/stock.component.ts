import { Component, OnInit } from '@angular/core';

import { ShoppingService } from '../../services/shopping.service';

import { ProductClass } from '../../models/product';

@Component({
  selector: 'app-stock',
  template: `
    <section class="layout-row layout-wrap">
      <section *ngFor="let product of products" class="flex_33">
        <app-product [product]="product" class="ph_16 pv_8 m_12 disp-b ut-product"></app-product>
      </section>
    </section>
  `,
  styles: []
})
export class StockComponent implements OnInit {

  public products: ProductClass[];

  constructor(private _shoppingService: ShoppingService) { }

  ngOnInit() {
    this.getStock();
  }

  private getStock () {
    this._shoppingService.getItems().subscribe((res) => {
      this.getCart();
    })
  }
  private getCart () {
    this._shoppingService.getProductsInCart().subscribe(res => {
      this.products = this._shoppingService.allProducts;
    });
  }

}

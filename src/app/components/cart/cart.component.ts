import { ProductClass } from './../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-cart',
  template: `
    <div *ngIf="products?.length">
      <table class="w_100 ta-c table table-striped mt_12">
        <thead>
          <tr class="layout-row fw_700">
            <td class="flex_20">Image</td>
            <td class="flex_25">Title</td>
            <td class="flex_10">Price</td>
            <td class="flex_20">Distributer</td>
            <td class="flex_10">Country</td>
            <td class="flex_10">Quantity</td>
          </tr>
        </thead>
        <tbody>
          <tr class="layout-row" *ngFor="let product of products; let productIndex = index;">
            <td class="flex_20"><img (click)="onProductDetail(product.id)" class="w_100" src="{{product.image}}" /></td>
            <td class="flex_25">{{product.company}} {{product.model}}</td>
            <td class="flex_10">{{product.price}}</td>
            <td class="flex_20">{{product.distributer}}</td>
            <td class="flex_10">{{product.country}}</td>
            <td class="flex_10 layout-row">
              <p class="flex_60">{{product.quantity}}</p>
              <p class="flex_40 layout-column">
                <button class="ut-cart__qty_btn" (click)="product.changeProductQuantity(true)"><i class="fa fa-caret-up"></i></button>
                <button class="ut-cart__qty_btn" (click)="product.changeProductQuantity(false)"><i class="fa fa-caret-down"></i></button>
              </p>
            </td>
            <td class="flex_5">
              <button class="btn btn-danger" (click)="onRemoveProductFromCart(product, productIndex)">
                <i class="fa fa-times"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ta-r">
        <button class="btn btn-success" (click)="onBuy()">Buy everything!</button>
      </div>
    </div>
    <div *ngIf="!products?.length">
      <h1 class="ta-c">Cart is empty!</h1>
      <div class="ta-r">
        <button class="btn btn-default" (click)="onBackToStock()">Back to stock</button>
      </div>
    </div>
  `,
  styles: []
})
export class CartComponent implements OnInit {

  private products: ProductClass[];

  constructor(private router: Router, private _shoppingService: ShoppingService) { }

  ngOnInit() {
    if (this._shoppingService.productsInCart.length < 1) {
      this._shoppingService.getItems().subscribe(res => {
        this.checkIsProductsInCart();
      });
    } else {
      this.products = this._shoppingService.productsInCart;
    }
  }
  private checkIsProductsInCart () {
    this._shoppingService.getProductsInCart().subscribe(res => {
      this.products = this._shoppingService.productsInCart;
    });
  }

  private onBuy () {
    this._shoppingService.buyAllProducts().subscribe(res => {
      this.products = [];
    });
  }
  private onBackToStock () {
    this.router.navigate( ['stock'] );
  }

  private onRemoveProductFromCart (product: ProductClass, i: number) {
    // this.products.splice(i, 1)
    product.removeFromCart();
  }

  private onProductDetail (id) {
    this.router.navigate( ['product', id ] );
  }

}

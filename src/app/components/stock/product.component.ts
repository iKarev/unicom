import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Rx';

import { ProductClass } from '../../models/product';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-product',
  template: `
    <section class="ut-product__top">
      <div (click)="onProductDetail()"><img class="w_100" src="{{product.image}}" alt=""></div>
    </section>
    <section class="ut-product__bottom">
      <p class="ut-product__title" (click)="onProductDetail()">{{product.company}} {{product.model}}</p>
      <p class="ut-product__price_old">$ {{product.price | oldprice}}</p>
      <div class="ut-product__price_wrapper layout-row layout-align-space-between-start">
        <span class="ta-r ut-product__price_new green">$ {{product.price}}</span>
        <button class="btn btn-primary" [disabled]="!product.inStock" *ngIf="!product.quantity"
          (click)="onAddProductToCart()">
          <span>В корзину </span><i class="fa fa-shopping-cart"></i>
        </button>
        <p class="ut-product__incart" *ngIf="product.quantity">
          <button class="ut-product__incart_text btn btn-success" (click)="onGoToCart()">
            <i class="fa fa-check"></i>
            <span>{{product.quantity}} в корзине</span>
          </button>
          <span>
            <button class="btn btn-default" (click)="product.changeProductQuantity(true)">
              <i class="fa fa-plus"></i>
            </button>
            <button class="btn btn-default" (click)="product.changeProductQuantity(false)">
              <i class="fa fa-minus"></i>
            </button>
          </span>
        </p>
      </div>
      <p class="m_0" [ngClass]="{'red':!product.inStock,'green':product.inStock}">
        <i class="fa" [ngClass]="{'fa-times':!product.inStock,'fa-thumbs-o-up':product.inStock}"></i>
        <span>{{product.inStock ? 'В наличии' : 'Нет в наличии'}}</span>
      </p>
      <p class="m_0 mb_8">
        <i class="fa fa-credit-card"></i>
        <span>Скидка 20%</span>
      </p>
    </section>
  `
})
export class ProductComponent implements OnInit {

  @Input() product: ProductClass;

  private subscription: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _shoppingService: ShoppingService) { }

  ngOnInit() {
  }

  private onProductDetail () {
    this.router.navigate( ['product', this.product.id ] );
  }
  private onGoToCart () {
    this.router.navigate( ['cart'] );
  }

  private onAddProductToCart () {
    this.product.addToCart();
  }


  private onRemoveProductFromCart () {
    this.product.removeFromCart();
  }

}

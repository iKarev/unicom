import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ShoppingService } from '../../services/shopping.service';
import { ProductClass } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  template: `
  <div class="ut-product-detail relative layout-row layout-align-start-start mt_12 ph_12" *ngIf="product">
    <section class="ut-product-detail__left flex_50 p_8">
      <div class="ut-product-detail__image">
        <img src="{{product.image}}" alt="" class="w_100">
      </div>
    </section>
    <section class="ut-product-detail__right flex_50 p_8 pl_0 layout-column layout-align-space-between-start">
      <div>
        <div class="ta-r">
          <button class="btn btn-link p_0" (click)="onReturnToStock()">
            <i class="fa fa-arrow-circle-o-left ut-product-detail__back"></i>
          </button>
        </div>
        <div class="layout-row layout-align-space-between-center">
          <h2 class="ut-product-detail__title mt_0">{{product.company}} {{product.model}}</h2>
          <p class="m_0" [ngClass]="{'red':!product.inStock,'green':product.inStock}">
            <i class="fa" [ngClass]="{'fa-times':!product.inStock,'fa-thumbs-o-up':product.inStock}"></i>
            <span>{{product.inStock ? 'In stock' : 'Not available'}}</span>
          </p>
        </div>
        <div class="ut-product-detail__price layout-row layout-align-space-between-start">
          <p class="ut-product-detail__price_new"><b>New Price: <span class="green">$ {{product.price | number:'.2-2'}}</span></b></p>
          <p class="ut-product-detail__price_old">Old Price: <span class="red">$ {{product.price | oldprice | number:'.2-2'}}</span></p>
        </div>
        <p class="ut-product-detail__description"><b>Description:</b> {{product.description}}</p>
        <p class="ut-product-detail__info"><b>Country:</b> {{product.country}}</p>
        <p class="ut-product-detail__info"><b>Distributer:</b> {{product.distributer}}</p>
        <p class="ut-product-detail__info"><b>Year:</b> {{product.year}}</p>
      </div>
      <div class="ut-product-detail__addtocart w_100" *ngIf="!product.quantity">
        <button class="btn btn-primary w_100" [disabled]="!product.inStock" (click)="onAddProductToCart()">
          <span>Put in cart </span><i class="fa fa-shopping-cart"></i>
        </button>
      </div>
      <div class="ut-product-detail__addtocart w_100 layout-row layout-align-space-between-start"
        *ngIf="product.quantity">
        <button class="ut-product__incart_text btn btn-success w_100" (click)="onGoToCart()">
          <i class="fa fa-check"></i>
          <span>{{product.quantity}} in cart</span>
        </button>
        <div class="flex_20 ta-r">
          <button class="btn btn-default" (click)="product.changeProductQuantity(true)">
            <i class="fa fa-plus"></i>
          </button>
          <button class="btn btn-default" (click)="product.changeProductQuantity(false)">
            <i class="fa fa-minus"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
  `
})
export class ProductDetailComponent implements OnInit {

  public product: ProductClass;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _shoppingService: ShoppingService) { }

  ngOnInit() {
    const productIndex = parseInt(document.location.pathname.slice(9), 0) - 1;
    if (this._shoppingService.allProducts.length < 1) {
      this._shoppingService.getItems().subscribe(res => {
        this.checkIsProductInCart(productIndex);
      });
    } else {
      const productInfo = this._shoppingService.allProducts[productIndex];
      this.product = productInfo;
    }
  }

  checkIsProductInCart (id) {
    this._shoppingService.getProductsInCart().subscribe(res => {
      this.product = this._shoppingService.allProducts[id];
    })
  }

  // private setNewProduct (info: ProductClass) {
  //   const {image, company, model, year, distributer, country, id, price, description, inStock} = info;
  //   const product = new ProductClass(this._shoppingService, image, company, model, year, distributer,
  //                                    country, id, price, description, inStock);
  //   return product;
  // }

  private onAddProductToCart () {
    this.product.addToCart();
  }

  private onReturnToStock () {
    this.router.navigate( ['stock'] );
  }
  private onGoToCart () {
    this.router.navigate( ['cart'] );
  }

}

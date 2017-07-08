import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { StockComponent } from './components/stock/stock.component';
import { ProductComponent } from './components/stock/product.component';

import { ShoppingService } from './services/shopping.service';

import { AppPipes } from './pipes/pipes.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


@NgModule({
  declarations: [
    AppComponent, CartComponent, StockComponent, ProductComponent, ProductDetailComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpModule,
    AppPipes
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { StockComponent } from './components/stock/stock.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: StockComponent
  }, {
    path: 'stock',
    component: StockComponent
  }, {
    path: 'cart',
    component: CartComponent
    // Comment loadChildren above and uncomment the line below to get non lazy loading working with AoT
    // Do not delete / comment the  `loadBundledModule` declaration or the module will be lazy loaded
    // loadChildren: './bundled/bundled.module#BundledModule'
  }, {
    path: 'product/:id', component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

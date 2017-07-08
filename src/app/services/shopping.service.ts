import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ProductClass } from '../models/product';

@Injectable()
export class ShoppingService {

    public productsInCart: ProductClass[] = [];
    public allProducts: ProductClass[] = [];

    private api = 'http://127.0.0.1:3000';
    constructor(public http: Http) {}

    // set apiUrl(){
    //     this.api = 'http://127.0.0.1:3000';
    // }

    public getItems() {
        // return this.setProducts(data.data);
        const headers = new Headers();
        headers.set('X-AUTH-TOKEN', localStorage.getItem('X-AUTH-TOKEN'));
        return this.http.get(`${this.api}/list`)
            .map((res: Response) => {
                // console.log(res);
                this.allProducts = this.setProducts(res);
                return this.setProducts(res);
            })
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
    public getProductsInCart () {
        return this.http.get(`${this.api}/cart`)
            .map((res: Response) => {
                const productsInCart = res.json();
                const products = [];
                for (const product of productsInCart) {
                    products.push(this.allProducts.find(item => {
                        if (item.id === product.id) {
                            item.quantity = product.quantity;
                        }
                        return item.id === product.id;
                    }));
                }
                this.productsInCart = products;
                return this.setProducts(res);
            })
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    public addProductToCart(product) {
        const headers = new Headers();
        const {id, quantity} = product;
        const data = {id, quantity};
        headers.append('Content-Type', 'text/plain');
        return this.http.post(`${this.api}/cart`, data, {headers: headers})
            .map((res: Response) => {
                this.productsInCart.push(product);
                return res.json();
            })
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
    public removeProductFromCart(product) {
        const headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        return this.http.delete(`${this.api}/${product.id}`, {headers: headers})
            .map((res: Response) => {
                const index = this.productsInCart.findIndex(item => item.id === product.id);
                this.productsInCart.splice(index, 1);
                return res.json();
            })
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    public buyAllProducts () {
        const headers = new Headers();
        return this.http.post(`${this.api}/unsetCart`, {headers: headers})
            .map((res: Response) => {
                this.productsInCart = [];
                return res.json();
            })
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    public changeProductQuantity (id, quantity) {
        const headers = new Headers();
        const data = {id, quantity};
        console.log(data);
        return this.http.put(`${this.api}`, data, {headers: headers})
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    private setProducts (res) {
        const data = res.json();
        const products = [];
        for (const product of data) {
            const {image, company, model, year, distributer, country, id, price, description, inStock} = product;
            products.push(new ProductClass(this, image, company, model, year, distributer, country, id, price, description, inStock));
        }
        return products;
    }

}

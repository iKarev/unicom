import { ShoppingService } from '../services/shopping.service';

export class ProductClass {

    public _quantity: number;

    constructor (
        private _shoppingService: ShoppingService,
        public image: string,
        public company: string,
        public model: string,
        public year: number,
        public distributer: string,
        public country: string,
        public id: number,
        public price: string,
        public description: string,
        public inStock: false
    ) {}

    public set quantity(value: number) {
        this._quantity = value;
    }
    public get quantity() {
        return this._quantity;
    }

    public addToCart () {
        this.quantity = 1;
        this._shoppingService.addProductToCart(this).subscribe();
    }
    public removeFromCart () {
        this._shoppingService.removeProductFromCart(this).subscribe();
    }

    public changeProductQuantity(isNeedAdd) {
        this.quantity += isNeedAdd ? 1 : -1;
        this._shoppingService.changeProductQuantity(this.id, this.quantity).subscribe();
    }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'oldprice'
})

export class OldPricePipe implements PipeTransform {
    transform(value: string, ...args: any[]): any {
        const price = parseInt(value, 0);
        return `${Math.ceil(price * 1.2)}`;
    }
}

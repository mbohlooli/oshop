import { Product } from 'shared/models/product';
import { DbHelper } from './db.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase, private dbHelper: DbHelper) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.dbHelper.objectAndCast('/shopping-carts/' + cartId)
      .map((x:{date, items}) => new ShoppingCart(x.items));
  }

  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  deleteFromCart(product: Product) {
    this.deleteItem(product);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key
  }

  private getItem(cartId, productId) {
    let object = this.dbHelper.object('/shopping-carts/' + cartId + '/items/' + productId);
    let observable = this.dbHelper.objectAndCast('/shopping-carts/' + cartId + '/items/' + productId);
    return { object: object, observable: observable };
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);

    item$.observable.take(1).subscribe((cartItem: {quantity: number}) => {
      let quantity = ((cartItem) ? cartItem.quantity : 0) + change;
      if(quantity === 0) item$.object.remove();
      else item$.object.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      })
    });
  }

  private async deleteItem(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);

    item$.observable.take(1).subscribe((cartItem: {quantity: number}) => item$.object.remove());
  }
}

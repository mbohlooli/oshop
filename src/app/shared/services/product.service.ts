import { DbHelper } from './db.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase, private dbService: DbHelper) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.dbService.list('/products');
  }

  get(productId) {
    return this.dbService.objectAndCast('/products/' + productId);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}

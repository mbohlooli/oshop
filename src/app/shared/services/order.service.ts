import { Observable } from 'rxjs';
import { Order } from './../models/order';
import { DbHelper } from './db.service';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private dbHelper: DbHelper, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: Order) {
    let items = _.omit(order.items, '$key');
    let finalOrder = {
      datePlaced: order.datePlaced,
      userId: order.userId,
      items: items,
      ...order.shipping
    }
    let result = await this.db.list('/orders').push(finalOrder);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.dbHelper.list('/orders');
  }

  getOrder(orderId: string): Observable<Order> {
    return this.dbHelper.objectAndCast('/orders/' + orderId);
  }

  getOrdersByUser(userId: string) {
    return this.dbHelper.list('/orders', q => {
      q.equalTo(userId);
      q.orderByChild('userId');
      return q;
    });
  }
}

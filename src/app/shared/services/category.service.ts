import { DbHelper } from './db.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: DbHelper) { }

  getAll() {
    return this.db.list('/categories', query => query.orderByChild('name'));
  }
}

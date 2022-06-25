import { Subscription, Observable } from 'rxjs';
import { AngularFireDatabase, QueryFn, PathReference } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class DbHelper {
  private items$;

  constructor(private db: AngularFireDatabase) { }

  list(path: PathReference, queryFn?: QueryFn): Observable<any[]> {
    // return Observable.of([{name: 1}, {name:1}]);
    this.items$ = this.db.list(path, queryFn)
    .snapshotChanges()
    .switchMap(items => items)
    .map(item => ({ $key: item.payload.key, ...item.payload.val() }));

    let items = [];

    this.items$.subscribe(item => items.push(item));
    this.items$.take(items.length);
    let res = items;
    return Observable.of(res);
  }

  objectAndCast<T>(path: PathReference) {
    return this.db.object(path)
    .valueChanges()
    .map((item: T) => item);
  }

  object(path: PathReference) {
    return this.db.object(path);
  }
}

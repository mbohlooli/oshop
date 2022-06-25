import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
import { forkJoin } from "rxjs/observable/forkJoin";
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  cart$: Observable<ShoppingCart>;
  query;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
      // let products$ = this.productService.getAll();
      // let categories$ = this.route.paramMap;

      // forkJoin([products$, categories$]).subscribe(results => {
      //   console.log(results);
      //   this.products = results[0];
      //   this.category = results[1].get('category')+'';
      // });

      // this.productService
      // .getAll()
      //   .subscribe(products => this.products = products);
      // this.route.queryParamMap
      //   .subscribe(params => {
      //     this.category = params.get('category');
      //     this.applyFilter();
      //   });
    }

    async ngOnInit() {
      this.cart$ = await this.shoppingCartService.getCart();
      this.populateProducts();
    }

    private populateProducts() {
      this.productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
    }

    private applyFilter() {
      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;

      this.filteredProducts = (this.query) ?
      this.filteredProducts.filter(product => product.title.toLowerCase().includes(this.query.toLowerCase())) :
      this.filteredProducts;
    }
}

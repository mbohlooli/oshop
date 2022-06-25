import { Component } from '@angular/core';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
  }

}

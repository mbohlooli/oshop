import { CategoryService } from 'shared/services/category.service';
import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }

  save(product) {
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want delete this product')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}

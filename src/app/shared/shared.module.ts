import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { DbHelper } from 'shared/services/db.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';
import { DataTableComponent } from 'shared/components/data-table/data-table.component';
import { RouterModule } from '@angular/router';
import { OrderDetailsComponent } from 'shared/components/order-details/order-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {
        path: 'orders/:id',
        component: OrderDetailsComponent,
        canActivate: [AuthGuard]
      }
    ]),
    NgbModule.forRoot(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    DataTableComponent,
    OrderDetailsComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    DbHelper,
    ShoppingCartService,
    OrderService
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    DataTableComponent,
    OrderDetailsComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgxPaginationModule,
    NgbModule.forRoot().ngModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ]
})
export class SharedModule { }

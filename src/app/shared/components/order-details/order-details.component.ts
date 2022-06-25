import { AuthService } from 'shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  appUser;
  order$;
  id;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.id = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getOrder(this.id);
  }

}

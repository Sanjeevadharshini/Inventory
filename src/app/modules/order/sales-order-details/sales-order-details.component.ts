import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-order-details',
  templateUrl: './sales-order-details.component.html',
  styleUrls: ['./sales-order-details.component.scss']
})
export class SalesOrderDetailsComponent implements OnInit {
  orderId: string = '';
  order: any = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    if (this.orderId) {
      this.orderService.getSalesOrderById(this.orderId).subscribe({
        next: (order) => this.order = order,
        error: (err) => Swal.fire('Error', err.error.message, 'error')
      });
    }
  }

  printInvoice() {
    window.print();
  }
}
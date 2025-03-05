import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-order-details',
  templateUrl: './purchase-order-details.component.html',
  styleUrls: ['./purchase-order-details.component.scss']
})
export class PurchaseOrderDetailsComponent implements OnInit {
  orderId: string = '';
  order: any = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    if (this.orderId) {
      this.orderService.getPurchaseOrderById(this.orderId).subscribe({
        next: (order) => this.order = order,
        error: (err) => Swal.fire('Error', err.error.message, 'error')
      });
    }
  }

  printReceipt() {
    window.print();
  }
}
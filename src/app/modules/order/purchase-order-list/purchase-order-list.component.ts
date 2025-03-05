import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {
  purchaseOrders: any[] = [];
  filteredOrders: any[] = [];
  searchTerm: string = '';

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadPurchaseOrders();
  }

  loadPurchaseOrders() {
    this.orderService.getAllPurchaseOrders().subscribe({
      next: (orders) => {
        this.purchaseOrders = orders;
        this.filteredOrders = orders;
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }

  searchOrders() {
    if (!this.searchTerm) {
      this.filteredOrders = this.purchaseOrders;
    } else {
      this.filteredOrders = this.purchaseOrders.filter(order =>
        order.orderId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.supplierId?.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
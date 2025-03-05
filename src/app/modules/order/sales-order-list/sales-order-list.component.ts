import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-order-list',
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.scss']
})
export class SalesOrderListComponent implements OnInit {
  salesOrders: any[] = [];
  filteredOrders: any[] = [];
  searchTerm: string = '';

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadSalesOrders();
  }

  loadSalesOrders() {
    this.orderService.getAllSalesOrders().subscribe({
      next: (orders) => {
        this.salesOrders = orders;
        this.filteredOrders = orders;
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }

  searchOrders() {
    if (!this.searchTerm) {
      this.filteredOrders = this.salesOrders;
    } else {
      this.filteredOrders = this.salesOrders.filter(order =>
        order.orderId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.customerId?.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.component.html',
  styleUrls: ['./customer-history.component.scss']
})

export class CustomerHistoryComponent implements OnInit {
  customerId: string = '';
  orders: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id') || '';
    if (this.customerId) {
      this.customerService.getOrderHistory(this.customerId).subscribe({
        next: (orders) => {
          this.orders = orders;
        },
        error: (err) => Swal.fire('Error', err.error.message, 'error')
      });
    }
  }
}
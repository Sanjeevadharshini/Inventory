import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  searchTerm: string = '';

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.filteredCustomers = customers;
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }

  searchCustomers() {
    if (!this.searchTerm) {
      this.filteredCustomers = this.customers;
    } else {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  deleteCustomer(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Customer has been deleted.', 'success');
            this.loadCustomers();
          },
          error: (err) => Swal.fire('Error', err.error.message, 'error')
        });
      }
    });
  }
}
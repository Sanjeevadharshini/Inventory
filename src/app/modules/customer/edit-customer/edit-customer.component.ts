import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  editCustomerForm: FormGroup;
  customerId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.editCustomerForm = this.fb.group({
      name: ['', Validators.required],
      contactNumber: [''],
      email: ['', [Validators.email]],
      address: ['']
    });
  }

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id') || '';
    if (this.customerId) {
      this.customerService.getCustomerById(this.customerId).subscribe({
        next: (customer) => {
          this.editCustomerForm.patchValue(customer);
        },
        error: (err) => Swal.fire('Error', err.error.message, 'error')
      });
    }
  }

  onSubmit() {
    if (this.editCustomerForm.invalid) return;

    this.customerService.updateCustomer(this.customerId, this.editCustomerForm.value).subscribe({
      next: (response) => {
        Swal.fire('Success', response.message, 'success');
        this.router.navigate(['/customer/list']);
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }
}
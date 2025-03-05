import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  addCustomerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.addCustomerForm = this.fb.group({
      name: ['', Validators.required],
      contactNumber: [''],
      email: ['', [Validators.email]],
      address: ['']
    });
  }

  onSubmit() {
    if (this.addCustomerForm.invalid) return;

    this.customerService.addCustomer(this.addCustomerForm.value).subscribe({
      next: (response) => {
        Swal.fire('Success', response.message, 'success');
        this.router.navigate(['/customer/list']);
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }
}
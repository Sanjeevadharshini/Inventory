import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent {
  addSupplierForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router
  ) {
    this.addSupplierForm = this.fb.group({
      name: ['', Validators.required],
      contactNumber: [''],
      email: ['', [Validators.email]],
      address: ['']
    });
  }

  onSubmit() {
    if (this.addSupplierForm.invalid) return;

    this.supplierService.addSupplier(this.addSupplierForm.value).subscribe({
      next: (response) => {
        Swal.fire('Success', response.message, 'success');
        this.router.navigate(['/supplier/list']);
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }
}
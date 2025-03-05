import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent implements OnInit {
  editSupplierForm: FormGroup;
  supplierId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private router: Router
  ) {
    this.editSupplierForm = this.fb.group({
      name: ['', Validators.required],
      contactNumber: [''],
      email: ['', [Validators.email]],
      address: ['']
    });
  }

  ngOnInit() {
    this.supplierId = this.route.snapshot.paramMap.get('id') || '';
    if (this.supplierId) {
      this.supplierService.getSupplierById(this.supplierId).subscribe({
        next: (supplier) => {
          this.editSupplierForm.patchValue(supplier);
        },
        error: (err) => Swal.fire('Error', err.error.message, 'error')
      });
    }
  }

  onSubmit() {
    if (this.editSupplierForm.invalid) return;

    this.supplierService.updateSupplier(this.supplierId, this.editSupplierForm.value).subscribe({
      next: (response) => {
        Swal.fire('Success', response.message, 'success');
        this.router.navigate(['/supplier/list']);
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }
}
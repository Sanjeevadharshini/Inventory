import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
    addProductForm: FormGroup;
    categories = ['Electronics', 'Clothing', 'Books', 'Furniture', 'Other']; // Example categories

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private router: Router
    ) {
        this.addProductForm = this.fb.group({
            name: ['', Validators.required],
            category: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(0)]],
            stock: ['', [Validators.required, Validators.min(0)]],
            description: ['']
        });
    }

    onSubmit() {
        if (this.addProductForm.invalid) return;

        this.productService.addProduct(this.addProductForm.value).subscribe({
            next: (response) => {
                Swal.fire('Success', response.message, 'success');
                this.router.navigate(['/product/list']);
            },
            error: (err) => Swal.fire('Error', err.error.message, 'error')
        });
    }
}
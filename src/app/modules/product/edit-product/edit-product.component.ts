import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
    editProductForm: FormGroup;
    productId: string = '';
    categories = ['Electronics', 'Clothing', 'Books', 'Furniture', 'Other'];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private productService: ProductService,
        private router: Router
    ) {
        this.editProductForm = this.fb.group({
            name: ['', Validators.required],
            category: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(0)]],
            stock: ['', [Validators.required, Validators.min(0)]],
            description: ['']
        });
    }

    ngOnInit() {
        this.productId = this.route.snapshot.paramMap.get('id') || '';
        if (this.productId) {
            this.productService.getProductById(this.productId).subscribe({
                next: (response) => {
                    const { product } = response;
                    this.editProductForm.patchValue(product);
                },
                error: (err) => Swal.fire('Error', err.error.message, 'error')
            });
        }
    }

    onSubmit() {
        if (this.editProductForm.invalid) return;

        this.productService.updateProduct(this.productId, this.editProductForm.value).subscribe({
            next: (response) => {
                Swal.fire('Success', response.message, 'success');
                this.router.navigate(['/product/list']);
            },
            error: (err) => Swal.fire('Error', err.error.message, 'error')
        });
    }
}
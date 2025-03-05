import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    product: any = null;
    stockHistory: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) {}

    ngOnInit() {
        const productId = this.route.snapshot.paramMap.get('id') || '';
        if (productId) {
            this.productService.getProductById(productId).subscribe({
                next: (response) => {
                    this.product = response.product;
                    this.stockHistory = response.stockHistory || [];
                },
                error: (err) => Swal.fire('Error', err.error.message, 'error')
            });
        }
    }

    editProduct() {
        this.router.navigate([`/product/edit/${this.product._id}`]);
    }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inward-stock',
  templateUrl: './inward-stock.component.html',
  styleUrls: ['./inward-stock.component.scss']
})
export class InwardStockComponent implements OnInit {
    inwardForm: FormGroup;
    products: any[] = [];
    suppliers: any[] = [];

    constructor(
        private fb: FormBuilder,
        private stockService: StockService,
        private router: Router
    ) {
        this.inwardForm = this.fb.group({
            productId: ['', Validators.required],
            supplierId: ['', Validators.required],
            quantity: ['', [Validators.required, Validators.min(1)]],
            purchasePrice: ['', [Validators.required, Validators.min(0)]],
            date: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.stockService.getProducts().subscribe(products => {
            this.products = products;
        });
        this.stockService.getSuppliers().subscribe(suppliers => {
            this.suppliers = suppliers;
        });
    }

    onSubmit() {
        if (this.inwardForm.invalid) return;

        this.stockService.addInwardStock(this.inwardForm.value).subscribe({
            next: (response) => {
                Swal.fire('Success', response.message, 'success');
                this.router.navigate(['/stock/overview']);
            },
            error: (err) => Swal.fire('Error', err.error.message, 'error')
        });
    }
}

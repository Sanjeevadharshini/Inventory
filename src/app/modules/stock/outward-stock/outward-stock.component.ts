import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-outward-stock',
  templateUrl: './outward-stock.component.html',
  styleUrls: ['./outward-stock.component.scss']
})
export class OutwardStockComponent implements OnInit {
    outwardForm: FormGroup;
    products: any[] = [];
    customers: any[] = [];

    constructor(
        private fb: FormBuilder,
        private stockService: StockService,
        private router: Router
    ) {
        this.outwardForm = this.fb.group({
            productId: ['', Validators.required],
            customerId: ['', Validators.required],
            quantity: ['', [Validators.required, Validators.min(1)]],
            salePrice: ['', [Validators.required, Validators.min(0)]],
            date: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.stockService.getProducts().subscribe(products => {
            this.products = products;
        });
        this.stockService.getCustomers().subscribe(customers => {
            this.customers = customers;
        });
    }

    onSubmit() {
        if (this.outwardForm.invalid) return;

        this.stockService.addOutwardStock(this.outwardForm.value).subscribe({
            next: (response) => {
                Swal.fire('Success', response.message, 'success');
                this.router.navigate(['/stock/overview']);
            },
            error: (err) => Swal.fire('Error', err.error.message, 'error')
        });
    }
}
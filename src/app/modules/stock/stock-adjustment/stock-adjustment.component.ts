import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.scss']
})
export class StockAdjustmentComponent implements OnInit {
    adjustmentForm: FormGroup;
    products: any[] = [];
    adjustmentTypes = ['Damage', 'Return'];

    constructor(
        private fb: FormBuilder,
        private stockService: StockService,
        private router: Router
    ) {
        this.adjustmentForm = this.fb.group({
            productId: ['', Validators.required],
            adjustmentType: ['', Validators.required],
            quantity: ['', [Validators.required, Validators.min(1)]],
            reason: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.stockService.getProducts().subscribe(products => {
            this.products = products;
        });
    }

    onSubmit() {
        if (this.adjustmentForm.invalid) return;

        this.stockService.addStockAdjustment(this.adjustmentForm.value).subscribe({
            next: (response) => {
                Swal.fire('Success', response.message, 'success');
                this.router.navigate(['/stock/overview']);
            },
            error: (err) => Swal.fire('Error', err.error.message, 'error')
        });
    }
}
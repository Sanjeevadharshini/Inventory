import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-history',
  templateUrl: './supplier-history.component.html',
  styleUrls: ['./supplier-history.component.scss']
})
export class SupplierHistoryComponent implements OnInit {
  supplierId: string = '';
  purchases: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService
  ) { }

  ngOnInit() {
    this.supplierId = this.route.snapshot.paramMap.get('id') || '';
    if (this.supplierId) {
      this.supplierService.getPurchaseHistory(this.supplierId).subscribe({
        next: (purchases) => {
          this.purchases = purchases;
        },
        error: (err) => Swal.fire('Error', err.error.message, 'error')
      });
    }
  }
}
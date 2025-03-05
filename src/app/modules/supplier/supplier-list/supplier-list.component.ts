import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
    suppliers: any[] = [];
    filteredSuppliers: any[] = [];
    searchTerm: string = '';

    constructor(private supplierService: SupplierService) {}

    ngOnInit() {
        this.loadSuppliers();
    }

    loadSuppliers() {
        this.supplierService.getAllSuppliers().subscribe({
            next: (suppliers) => {
                this.suppliers = suppliers;
                this.filteredSuppliers = suppliers;
            },
            error: (err) => Swal.fire('Error', err.error.message, 'error')
        });
    }

    searchSuppliers() {
        if (!this.searchTerm) {
            this.filteredSuppliers = this.suppliers;
        } else {
            this.filteredSuppliers = this.suppliers.filter(supplier =>
                supplier.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    }

    deleteSupplier(id: string) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.supplierService.deleteSupplier(id).subscribe({
                    next: () => {
                        Swal.fire('Deleted!', 'Supplier has been deleted.', 'success');
                        this.loadSuppliers();
                    },
                    error: (err) => Swal.fire('Error', err.error.message, 'error')
                });
            }
        });
    }
}
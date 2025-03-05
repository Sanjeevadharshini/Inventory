import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;        
      },
      error: (err) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    });
  }

  searchProducts() {
    if (!this.searchTerm) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  addProduct() {
    this.router.navigate(['/product/add']);
  }

  editProduct(id: string) {
    this.router.navigate([`/product/edit/${id}`]);
  }

  deleteProduct(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            this.loadProducts();
          },
          error: (err) => Swal.fire('Error', err.error.message, 'error')
        });
      }
    });
  }

  viewDetails(id: string) {
    this.router.navigate([`/product/details/${id}`]);
  }
}
import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-overview',
  templateUrl: './stock-overview.component.html',
  styleUrls: ['./stock-overview.component.scss']
})
export class StockOverviewComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.loadStockOverview();
  }

  loadStockOverview() {
    this.stockService.getStockOverview().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.categories = [...new Set(products.map(p => p.category))];
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }

  filterByCategory() {
    this.applyFilters();
  }

  searchProducts() {
    this.applyFilters();
  }

  applyFilters() {
    let tempProducts = this.products;

    if (this.selectedCategory) {
      tempProducts = tempProducts.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchTerm) {
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredProducts = tempProducts;
  }

  getStockIndicator(stock: number): string {
    return stock < 10 ? 'text-danger' : '';
  }
}

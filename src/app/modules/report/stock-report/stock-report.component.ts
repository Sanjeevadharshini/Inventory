import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { NgxCsvParser } from 'ngx-csv-parser';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.scss']
})
export class StockReportComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(
    private reportService: ReportService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.loadStockReport();
    this.loadCategories();
  }

  loadStockReport(category?: string) {
    this.reportService.getStockReport(category).subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }

  loadCategories() {
    this.productService.getAllProducts().subscribe(products => {
      this.categories = [...new Set(products.map(p => p.category))];
    });
  }

  filterByCategory() {
    this.loadStockReport(this.selectedCategory);
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Stock Report', 10, 10);
    let y = 20;
    this.filteredProducts.forEach((product, index) => {
      const lowStock = product.stock < 10 ? '(Low Stock)' : '';
      doc.text(`${index + 1}. ${product.name} (${product.category}) - Stock: ${product.stock} ${lowStock}`, 10, y);
      y += 10;
    });
    doc.save('stock-report.pdf');
  }

  exportToCSV() {
    let csvContent = 'Name,Category,Stock,Low Stock\n';

    // Format CSV data
    this.filteredProducts.forEach((product: any) => {
      csvContent += `${product.name},${product.category},${product.stock},${product.stock < 10 ? 'Yes' : 'No'}\n`;
    });

    // Create Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stock-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
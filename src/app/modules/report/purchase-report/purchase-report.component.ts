import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from '../../../services/report.service';
import { SupplierService } from '../../../services/supplier.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { NgxCsvParser } from 'ngx-csv-parser';

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.scss']
})
export class PurchaseReportComponent implements OnInit {
  purchaseForm: FormGroup;
  purchaseData: any = { totalPurchases: 0, productWisePurchases: [], supplierWisePurchases: [] };
  suppliers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private supplierService: SupplierService
  ) {
    this.purchaseForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      supplierId: ['']
    });
  }

  ngOnInit() {
    this.supplierService.getAllSuppliers().subscribe(suppliers => this.suppliers = suppliers);
    this.loadPurchaseReport();
  }

  loadPurchaseReport() {
    const { startDate, endDate, supplierId } = this.purchaseForm.value;
    this.reportService.getPurchaseReport(startDate, endDate, supplierId).subscribe({
      next: (data) => this.purchaseData = data,
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Purchase Report', 10, 10);
    doc.text(`Total Purchases: ${this.purchaseData.totalPurchases}`, 10, 20);
    let y = 30;
    doc.text('Product-wise Purchases:', 10, y);
    y += 10;
    this.purchaseData.productWisePurchases.forEach((item: any, index: number) => {
      doc.text(`${index + 1}. ${item.name}: ${item.total}`, 10, y);
      y += 10;
    });
    doc.text('Supplier-wise Purchases:', 10, y);
    y += 10;
    this.purchaseData.supplierWisePurchases.forEach((item: any, index: number) => {
      doc.text(`${index + 1}. ${item.name}: ${item.total}`, 10, y);
      y += 10;
    });
    doc.save('purchase-report.pdf');
  }

  exportToCSV() {
    let csvContent = 'Title,Value\n';
  
    // Add Total Purchases
    csvContent += `Total Purchases,${this.purchaseData.totalPurchases}\n`;
  
    // Add Product-wise Purchases
    csvContent += 'Product-wise Purchases,\n';
    this.purchaseData.productWisePurchases.forEach((item: any) => {
      csvContent += `${item.name},${item.total}\n`;
    });
  
    // Add Supplier-wise Purchases
    csvContent += 'Supplier-wise Purchases,\n';
    this.purchaseData.supplierWisePurchases.forEach((item: any) => {
      csvContent += `${item.name},${item.total}\n`;
    });
  
    // Create Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'purchase-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  
}
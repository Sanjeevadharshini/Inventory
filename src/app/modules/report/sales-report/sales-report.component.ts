import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from '../../../services/report.service';
import { CustomerService } from '../../../services/customer.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { NgxCsvParser } from 'ngx-csv-parser';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  salesForm: FormGroup;
  salesData: any = { totalSales: 0, productWiseSales: [], customerWiseSales: [] };
  customers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private customerService: CustomerService
  ) {
    this.salesForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      customerId: ['']
    });
  }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(customers => this.customers = customers);
    this.loadSalesReport();
  }

  loadSalesReport() {
    const { startDate, endDate, customerId } = this.salesForm.value;
    this.reportService.getSalesReport(startDate, endDate, customerId).subscribe({
      next: (data) => this.salesData = data,
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Sales Report', 10, 10);
    doc.text(`Total Sales: ${this.salesData.totalSales}`, 10, 20);
    let y = 30;
    doc.text('Product-wise Sales:', 10, y);
    y += 10;
    this.salesData.productWiseSales.forEach((item: any, index: number) => {
      doc.text(`${index + 1}. ${item.name}: ${item.total}`, 10, y);
      y += 10;
    });
    doc.text('Customer-wise Sales:', 10, y);
    y += 10;
    this.salesData.customerWiseSales.forEach((item: any, index: number) => {
      doc.text(`${index + 1}. ${item.name}: ${item.total}`, 10, y);
      y += 10;
    });
    doc.save('sales-report.pdf');
  }

  exportToCSV() {
    let csvContent = 'Title,Value\n';

    // Add Total Sales
    csvContent += `Total Sales,${this.salesData.totalSales}\n`;

    // Add Product-wise Sales
    csvContent += 'Product-wise Sales,\n';
    this.salesData.productWiseSales.forEach((item: any) => {
      csvContent += `${item.name},${item.total}\n`;
    });

    // Add Customer-wise Sales
    csvContent += 'Customer-wise Sales,\n';
    this.salesData.customerWiseSales.forEach((item: any) => {
      csvContent += `${item.name},${item.total}\n`;
    });

    // Create Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
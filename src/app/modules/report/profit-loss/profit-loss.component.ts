import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from '../../../services/report.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { NgxCsvParser } from 'ngx-csv-parser';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.scss']
})
export class ProfitLossComponent implements OnInit {
  profitLossForm: FormGroup;
  profitLossData: any = { totalRevenue: 0, totalCost: 0, profitLoss: 0 };

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService
  ) {
    this.profitLossForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit() {
    this.loadProfitLossReport();
  }

  loadProfitLossReport() {
    const { startDate, endDate } = this.profitLossForm.value;
    this.reportService.getProfitLossReport(startDate, endDate).subscribe({
      next: (data) => this.profitLossData = data,
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Profit & Loss Report', 10, 10);
    doc.text(`Total Revenue: ${this.profitLossData.totalRevenue}`, 10, 20);
    doc.text(`Total Cost: ${this.profitLossData.totalCost}`, 10, 30);
    doc.text(`Profit/Loss: ${this.profitLossData.profitLoss}`, 10, 40);
    doc.save('profit-loss-report.pdf');
  }

  exportToCSV() {
    const csvData = [
      ['Title', 'Value'],
      ['Total Revenue', this.profitLossData.totalRevenue],
      ['Total Cost', this.profitLossData.totalCost],
      ['Profit/Loss', this.profitLossData.profitLoss]
    ];

    let csvContent = '';
    csvData.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profit-loss-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from '../../services/report.service';
import Swal from 'sweetalert2';
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    stats: any = {
        totalProducts: 0,
        lowStock: 0,
        recentSales: [],
        recentPurchases: []
    };

    @ViewChild('salesChart') salesChartCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('stockChart') stockChartCanvas!: ElementRef<HTMLCanvasElement>;
    private salesChart!: Chart;
    private stockChart!: Chart;

    constructor(private reportService: ReportService) { }

    ngOnInit() {
        this.loadStats();
    }

    ngAfterViewInit() {
        this.loadSalesData();
        this.loadStockData();
    }

    loadStats() {
        this.reportService.getDashboardStats().subscribe({
            next: (data) => this.stats = data,
            error: (err) => Swal.fire('Error', 'Failed to load dashboard stats.', 'error')
        });
    }

    loadSalesData() {
        this.reportService.getSalesReport().subscribe({
            next: (data) => {
                const labels = data.salesOrders.map((order: any) => new Date(order.date).toLocaleDateString());
                const amounts = data.salesOrders.map((order: any) => order.totalAmount);
                const slicedLabels = labels.slice(0, 5);
                const slicedAmounts = amounts.slice(0, 5);

                this.salesChart = new Chart(this.salesChartCanvas.nativeElement, {
                    type: 'line',
                    data: {
                        labels: slicedLabels,
                        datasets: [{
                            label: 'Sales Over Time',
                            data: slicedAmounts,
                            borderColor: '#007bff',
                            fill: false,
                            tension: 0.1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top'
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Amount'
                                },
                                beginAtZero: true
                            }
                        }
                    }
                });
            },
            error: (err) => console.error('Error loading sales data for chart', err)
        });
    }

    loadStockData() {
        this.reportService.getStockReport().subscribe({
            next: (products) => {
                const labels = products.map((p: any) => p.name);
                const stocks = products.map((p: any) => p.stock);
                const slicedLabels = labels.slice(0, 5);
                const slicedStocks = stocks.slice(0, 5);

                this.stockChart = new Chart(this.stockChartCanvas.nativeElement, {
                    type: 'bar',
                    data: {
                        labels: slicedLabels,
                        datasets: [{
                            label: 'Stock Levels',
                            data: slicedStocks,
                            backgroundColor: '#28a745'
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top'
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Product'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Stock'
                                },
                                beginAtZero: true
                            }
                        }
                    }
                });
            },
            error: (err) => console.error('Error loading stock data for chart', err)
        });
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private apiUrl = 'http://localhost:3000/api/reports';

    constructor(private http: HttpClient) { }

    getStockReport(category?: string): Observable<any[]> {
        const params: any = {};
        if (category) params.category = category;
        return this.http.get<any[]>(`${this.apiUrl}/stock`, { params });
    }

    getSalesReport(startDate?: string, endDate?: string, customerId?: string): Observable<any> {
        const params: any = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        if (customerId) params.customerId = customerId;
        return this.http.get<any>(`${this.apiUrl}/sales`, { params });
    }

    getPurchaseReport(startDate?: string, endDate?: string, supplierId?: string): Observable<any> {
        const params: any = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        if (supplierId) params.supplierId = supplierId;
        return this.http.get<any>(`${this.apiUrl}/purchases`, { params });
    }

    getProfitLossReport(startDate?: string, endDate?: string): Observable<any> {
        const params: any = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        return this.http.get<any>(`${this.apiUrl}/profit-loss`, { params });
    }

    getDashboardStats(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/dashboard-stats`);
    }
}
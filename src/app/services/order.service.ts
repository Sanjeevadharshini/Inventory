import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:3000/api/orders';

    constructor(private http: HttpClient) { }

    // Sales Orders
    getAllSalesOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/sales`);
    }

    createSalesOrder(order: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/sales`, order);
    }

    getSalesOrderById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/sales/${id}`);
    }

    updateSalesOrder(id: string, order: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/sales/${id}`, order);
    }

    // Purchase Orders
    getAllPurchaseOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/purchases`);
    }

    createPurchaseOrder(order: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/purchases`, order);
    }

    getPurchaseOrderById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/purchases/${id}`);
    }

    updatePurchaseOrder(id: string, order: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/purchases/${id}`, order);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private apiUrl = `${environment.api_url}api/stock`;

    constructor(private http: HttpClient) { }

    getStockOverview(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/overview`);
    }

    addInwardStock(stockData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/inward`, stockData);
    }

    addOutwardStock(stockData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/outward`, stockData);
    }

    addStockAdjustment(stockData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/adjustment`, stockData);
    }

    getSuppliers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/suppliers`);
    }

    getCustomers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/customers`);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>('http://localhost:3000/api/products');
    }
}
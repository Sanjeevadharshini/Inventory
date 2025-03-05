import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = `${environment.api_url}api/products`;

    constructor(private http: HttpClient) {}

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl, { headers: this.getAuthHeader() });
    }

    addProduct(product: Product): Observable<any> {
        return this.http.post<any>(this.apiUrl, product, { headers: this.getAuthHeader() });
    }

    getProductById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeader() });
    }

    updateProduct(id: string, product: Product): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, product, { headers: this.getAuthHeader() });
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeader() });
    }

    private getAuthHeader() {
        const token = localStorage.getItem('token');
        return { Authorization: `Bearer ${token}` };
    }
}
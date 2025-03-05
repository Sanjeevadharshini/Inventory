import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    private apiUrl = `${environment.api_url}api/suppliers`;

    constructor(private http: HttpClient) { }

    getAllSuppliers(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    addSupplier(supplier: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, supplier);
    }

    getSupplierById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    updateSupplier(id: string, supplier: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, supplier);
    }

    deleteSupplier(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    getPurchaseHistory(id: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${id}/purchases`);
    }
}
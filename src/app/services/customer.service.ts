import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private apiUrl = 'http://localhost:3000/api/customers';

    constructor(private http: HttpClient) { }

    getAllCustomers(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    addCustomer(customer: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, customer);
    }

    getCustomerById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    updateCustomer(id: string, customer: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, customer);
    }

    deleteCustomer(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    getOrderHistory(id: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${id}/orders`);
    }
}
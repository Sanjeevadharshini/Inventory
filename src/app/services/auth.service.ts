import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/auth';
    private userRole: string | null = null;

    constructor(private http: HttpClient, private router: Router) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.userRole = JSON.parse(storedUser).role;
        }
    }

    login(email: string, password: string): Observable<any> {
        return new Observable(observer => {
            this.http.post<any>(`${this.apiUrl}/login`, { email, password }).subscribe({
                next: (response) => {
                    this.saveToken(response.token);
                    this.userRole = response.user.role;
                    localStorage.setItem('user', JSON.stringify(response.user));
                    observer.next(response);
                    observer.complete();
                },
                error: (err) => observer.error(err)
            });
        });
    }

    register(user: User): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, user, { headers: this.getAuthHeader() });
    }

    getProfile(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/profile`, { headers: this.getAuthHeader() });
    }

    updateProfile(user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/profile`, user, { headers: this.getAuthHeader() });
    }

    updateUser(userId: string, user: Partial<User>): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/users/${userId}`, user, { headers: this.getAuthHeader() });
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/users`, { headers: this.getAuthHeader() });
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/users/${id}`, { headers: this.getAuthHeader() });
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
    }

    resetPassword(token: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/reset-password`, { token, password });
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUserRole(): string | null {
        return this.userRole;
    }

    private getAuthHeader() {
        return { Authorization: `Bearer ${this.getToken()}` };
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.userRole = null;
        this.router.navigate(['/auth/login']);
    }

    sessionExpired(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.userRole = null;
        Swal.fire('Session Expired', 'Your session has expired. Please log in again.', 'warning').then(() => {
            this.router.navigate(['/auth/login']);
        });
    }
}
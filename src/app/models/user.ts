export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    role: 'Admin' | 'Manager' | 'Employee';
    status?: 'Active' | 'Inactive';
}
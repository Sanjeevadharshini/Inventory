export interface Product {
    id?: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description?: string;
    stockHistory?: Stock[];
}

export interface Stock {
    id?: string;
    productId: string;
    type: 'Inward' | 'Outward' | 'Adjustment';
    quantity: number;
    date: string;
    reason?: string;
}
export interface SalesOrder {
    id?: string;
    customerId: string;
    products: { productId: string; quantity: number; price: number }[];
    totalAmount: number;
    date: Date;
    status: 'Pending' | 'Completed';
}
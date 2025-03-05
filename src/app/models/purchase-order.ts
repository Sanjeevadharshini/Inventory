export interface PurchaseOrder {
    id?: string;
    supplierId: string;
    products: { productId: string; quantity: number; price: number }[];
    totalAmount: number;
    date: Date;
    status: 'Pending' | 'Completed';
}
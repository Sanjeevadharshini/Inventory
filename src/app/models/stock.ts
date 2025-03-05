export interface Stock {
    id?: string;
    productId: string;
    type: 'Inward' | 'Outward' | 'Adjustment';
    quantity: number;
    date: Date;
    reason?: string;
}
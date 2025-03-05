import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';
import { CreateSalesOrderComponent } from './create-sales-order/create-sales-order.component';
import { SalesOrderDetailsComponent } from './sales-order-details/sales-order-details.component';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { CreatePurchaseOrderComponent } from './create-purchase-order/create-purchase-order.component';
import { PurchaseOrderDetailsComponent } from './purchase-order-details/purchase-order-details.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
    declarations: [
        SalesOrderListComponent,
        CreateSalesOrderComponent,
        SalesOrderDetailsComponent,
        PurchaseOrderListComponent,
        CreatePurchaseOrderComponent,
        PurchaseOrderDetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OrderRoutingModule
    ]
})
export class OrderModule { }
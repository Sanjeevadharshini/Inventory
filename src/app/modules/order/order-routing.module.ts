import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';
import { CreateSalesOrderComponent } from './create-sales-order/create-sales-order.component';
import { SalesOrderDetailsComponent } from './sales-order-details/sales-order-details.component';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { CreatePurchaseOrderComponent } from './create-purchase-order/create-purchase-order.component';
import { PurchaseOrderDetailsComponent } from './purchase-order-details/purchase-order-details.component';

import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
    { path: 'sales', component: SalesOrderListComponent, canActivate: [AuthGuard] },
    { path: 'sales/create', component: CreateSalesOrderComponent, canActivate: [AuthGuard] },
    { path: 'sales/details/:id', component: SalesOrderDetailsComponent, canActivate: [AuthGuard] },
    { path: 'sales/edit/:id', component: CreateSalesOrderComponent, canActivate: [AuthGuard] },
    { path: 'purchases', component: PurchaseOrderListComponent, canActivate: [AuthGuard] },
    { path: 'purchases/create', component: CreatePurchaseOrderComponent, canActivate: [AuthGuard] },
    { path: 'purchases/details/:id', component: PurchaseOrderDetailsComponent, canActivate: [AuthGuard] },
    { path: 'purchases/edit/:id', component: CreatePurchaseOrderComponent, canActivate: [AuthGuard] }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule { }

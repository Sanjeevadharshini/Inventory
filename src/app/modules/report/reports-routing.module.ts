import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockReportComponent } from './stock-report/stock-report.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
    { path: 'stock', component: StockReportComponent, canActivate: [AuthGuard] },
    { path: 'sales', component: SalesReportComponent, canActivate: [AuthGuard] },
    { path: 'purchases', component: PurchaseReportComponent, canActivate: [AuthGuard] },
    { path: 'profit-loss', component: ProfitLossComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import { InwardStockComponent } from './inward-stock/inward-stock.component';
import { OutwardStockComponent } from './outward-stock/outward-stock.component';
import { StockAdjustmentComponent } from './stock-adjustment/stock-adjustment.component';
import { AuthGuard } from '../../guards/auth.guard';


const routes: Routes = [
    { path: 'overview', component: StockOverviewComponent, canActivate: [AuthGuard] },
    { path: 'inward', component: InwardStockComponent, canActivate: [AuthGuard] },
    { path: 'outward', component: OutwardStockComponent, canActivate: [AuthGuard] },
    { path: 'adjustment', component: StockAdjustmentComponent, canActivate: [AuthGuard] }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockRoutingModule { }

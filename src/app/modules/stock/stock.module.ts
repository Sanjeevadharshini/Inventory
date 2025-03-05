import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import { InwardStockComponent } from './inward-stock/inward-stock.component';
import { OutwardStockComponent } from './outward-stock/outward-stock.component';
import { StockAdjustmentComponent } from './stock-adjustment/stock-adjustment.component';
import { StockRoutingModule } from './stock-routing.module';

@NgModule({
    declarations: [
        StockOverviewComponent,
        InwardStockComponent,
        OutwardStockComponent,
        StockAdjustmentComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StockRoutingModule
    ]
})
export class StockModule { }
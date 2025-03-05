import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StockReportComponent } from './stock-report/stock-report.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { ReportsRoutingModule } from './reports-routing.module';



@NgModule({
    declarations: [
        StockReportComponent,
        SalesReportComponent,
        PurchaseReportComponent,
        ProfitLossComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ReportsRoutingModule
    ]
})
export class ReportsModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { AuthGuard } from '../../guards/auth.guard';
import { SupplierHistoryComponent } from './supplier-history/supplier-history.component';
import { SupplierRoutingModule } from './supplier-routing.module';

@NgModule({
    declarations: [
        SupplierListComponent,
        AddSupplierComponent,
        EditSupplierComponent,
        SupplierHistoryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SupplierRoutingModule
    ]
})
export class SupplierModule { }
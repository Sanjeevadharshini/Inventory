import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { SupplierHistoryComponent } from './supplier-history/supplier-history.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
    { path: 'list', component: SupplierListComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddSupplierComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditSupplierComponent, canActivate: [AuthGuard] },
    { path: 'purchases/:id', component: SupplierHistoryComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupplierRoutingModule { }

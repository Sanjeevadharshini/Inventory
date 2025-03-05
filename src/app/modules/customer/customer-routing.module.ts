import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerHistoryComponent } from './customer-history/customer-history.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
    { path: 'list', component: CustomerListComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddCustomerComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditCustomerComponent, canActivate: [AuthGuard] },
    { path: 'orders/:id', component: CustomerHistoryComponent, canActivate: [AuthGuard] }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }

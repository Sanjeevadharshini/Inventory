import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerHistoryComponent } from './customer-history/customer-history.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
    declarations: [
        CustomerListComponent,
        AddCustomerComponent,
        EditCustomerComponent,
        CustomerHistoryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomerRoutingModule
    ]
})
export class CustomerModule { }
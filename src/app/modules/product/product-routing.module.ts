import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
    { path: 'list', component: ProductListComponent },
    { path: 'add', component: AddProductComponent },
    { path: 'edit/:id', component: EditProductComponent },
    { path: 'details/:id', component: ProductDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductRoutingModule } from './product-routing.module';


@NgModule({
    declarations: [
        ProductListComponent,
        AddProductComponent,
        EditProductComponent,
        ProductDetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductRoutingModule,
    ]
})
export class ProductModule {}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { SupplierService } from '../../../services/supplier.service';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.scss']
})
export class CreatePurchaseOrderComponent implements OnInit {
  purchaseOrderForm: FormGroup;
  suppliers: any[] = [];
  products: any[] = [];
  orderId: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private supplierService: SupplierService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.purchaseOrderForm = this.fb.group({
      supplierId: ['', Validators.required],
      products: this.fb.array([]),
      date: ['', Validators.required],
      notes: [''],
      status: ['Completed'] // Added status field for edit mode
    });
  }

  ngOnInit() {
    this.supplierService.getAllSuppliers().subscribe(suppliers => this.suppliers = suppliers);
    this.productService.getAllProducts().subscribe(products => this.products = products);

    // Check if we're in edit mode
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.isEditMode = true;
      this.orderService.getPurchaseOrderById(this.orderId).subscribe({
        next: (order) => {
          this.setFormValues(order);
        },
        error: (err) => Swal.fire('Error', err.error.message, 'error')
      });
    }
  }

  get productForms() {
    return this.purchaseOrderForm.get('products') as FormArray;
  }

  setFormValues(order: any) {
    console.log(order);

    this.purchaseOrderForm.patchValue({
      supplierId: order.supplierId._id,
      date: new Date(order.date).toISOString().split('T')[0],
      notes: order.notes,
      status: order.status
    });

    // Clear existing product forms
    while (this.productForms.length !== 0) {
      this.productForms.removeAt(0);
    }

    // Add products from the order
    order.products.forEach((item: any) => {
      this.productForms.push(this.fb.group({
        productId: [item.productId._id || '', Validators.required],
        quantity: [item.quantity || '', [Validators.required, Validators.min(1)]],
        price: [item.price || '', [Validators.required, Validators.min(0)]]
      }));
    });
  }

  addProduct() {
    const productForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
    this.productForms.push(productForm);
  }

  removeProduct(index: number) {
    this.productForms.removeAt(index);
  }

  onSubmit() {
    if (this.purchaseOrderForm.invalid || this.productForms.length === 0) {
      Swal.fire('Error', 'Please fill out all required fields and add at least one product.', 'error');
      return;
    }

    const submitMethod = this.isEditMode
      ? this.orderService.updatePurchaseOrder(this.orderId!, this.purchaseOrderForm.value)
      : this.orderService.createPurchaseOrder(this.purchaseOrderForm.value);

    submitMethod.subscribe({
      next: (response) => {
        Swal.fire('Success', response.message, 'success');
        this.router.navigate(['/order/purchases']);
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }
}
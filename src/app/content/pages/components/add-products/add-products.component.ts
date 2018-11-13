
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { Router } from '@angular/router';
@Component({
  selector: 'm-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  suppliers;
  productForm: FormGroup;
  loader = false;
  isNewSupplierAdded = false;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _authService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'asin1': [null, Validators.required],
      'item-name': [null, Validators.required],
      'seller-sku': [null, Validators.required],
      'quantity': [null, Validators.required],
      'price': [null, Validators.required],
      'inbound': [null, Validators.required],
      'supplier_id': [null, Validators.required],
      'source': 'custom',
      'seller_id': 'A2WR6NEBQYUU6E'
    });
    this.getAllSuppliers();
  }
  addProduct(newProductData) {
    try {
      this.loader = true;
      this._authService.postTypeAjax('/seller/addProduct', newProductData).subscribe((res) => {
        this.loader = false;
        this.router.navigate(['/product']);
      });
    } catch (e) {
      this.loader = false;
    }
  }

  getAllSuppliers() {
    try {
      this._authService.getTypeAjax('/seller/getSupplierList').subscribe((res) => {
        this.suppliers = res;
      });
    } catch (e) {
    }
  }
  addNewSupplier() {
    const dialogRef = this.dialog.open(AddSupplierComponent, {
      width: '40vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isNewSupplierAdded = true;
        this.getAllSuppliers();
      }
    });
  }
}

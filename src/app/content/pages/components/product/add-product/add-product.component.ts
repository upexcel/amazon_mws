import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddSupplierComponent } from '../add-supplier/add-supplier.component';
import { AuthenticationService } from '../../../../../core/auth/authentication.service';
@Component({
  selector: 'm-add-product',
  templateUrl: './add-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent implements OnInit {
  suppliers = [{
    id: '1',
    value: 'spplier 1'
  }, {
    id: '2',
    value: 'spplier 2'
  }];
  productForm: FormGroup;
  loader = false;
  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _authService: AuthenticationService
  ) { }

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
    console.log('newProductData', newProductData)
    try {
      this.loader = true;
      this._authService.postTypeAjax('/seller/addProduct', newProductData).subscribe((res) => {
        this.dialogRef.close(res);
      this.loader = false;
      });
    } catch (e) {
      this.loader = false;
      console.log(e);
    }
  }

  getAllSuppliers() {
    try {
      this._authService.getTypeAjax('/seller/getSupplierList').subscribe((res) => {
        this.suppliers = res;
      });
    } catch (e) {
      console.log(e);
    }
  }

  close(data) {
    this.dialogRef.close(data);
  }

  addNewSupplier() {
    const dialogRef = this.dialog.open(AddSupplierComponent, {
      width: '40vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllSuppliers();
      }
    });
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../../../../core/auth/authentication.service';

@Component({
  selector: 'm-add-supplier',
  templateUrl: './add-supplier.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSupplierComponent implements OnInit {
  supplierForm: FormGroup;
  loader = false;
  constructor(
    public dialogRef: MatDialogRef<AddSupplierComponent>,
    private formBuilder: FormBuilder,
    private _authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.supplierForm = this.formBuilder.group({
      'name': [null, Validators.required]
    });
  }

  addSupplier(newSupplier) {
    console.log('newsupplier', newSupplier)
    try {
      this.loader = true;
      this._authService.postTypeAjax('/seller/addSupplier', newSupplier).subscribe((res) => {
        this.dialogRef.close(res);
        this.loader = false;
      });
    } catch (e) {
      this.loader = false;
      console.log(e);
    }
  }

  close(data) {
    this.dialogRef.close(data);
  }
}

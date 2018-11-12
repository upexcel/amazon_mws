import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'm-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  getProducts;
  getProductList;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  suppliers = [];
  displayedColumns = [
    'asin1',
    'item-name',
    'seller-sku',
    'quantity',
    'price',
    'inbound',
    'source',
    'supplier_id'
  ];
  loading: boolean;
  resultsLength = 0;
  limit = 10;
  constructor(
    private _change: ChangeDetectorRef,
    private _authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.ProductList();
      this.sort.sortChange.subscribe(() => {
        this.paginator.pageIndex = 0;
        this.ProductList();
      });
      this.paginator.page.subscribe(() => {
        this.ProductList();
      });
    }, 500);
    this.getAllSuppliers();
  }

  getProduct() {
    this.loading = true;
    try {
      this._authService.getTypeAjax('/seller/RequestReportForproduct/A2WR6NEBQYUU6E').subscribe(res => {
      });
      this.ProductList();
    } catch (e) {
      this.loading = false;
    }
  }

  ProductList() {
    this.loading = true;
    console.log(this.sort, this.paginator);
    try {
      this._authService.getTypeAjax(
        `/seller/GetProductReportById/A2WR6NEBQYUU6E?page=${this.paginator.pageIndex}&limit=${this.limit}&sortBy=${this.sort.active}&order=${this.sort.direction}`)
        .subscribe(res => {
          this.loading = false;
          console.log(res, '***********');

          this.getProductList = res['data'];
          this.dataSource = this.getProductList;
          this.resultsLength = res['length'];
          this._change.detectChanges();
        });
    } catch (e) {
      this.loading = false;
    }
  }

  GetMatchingProduct(element) {
    this.router.navigate(['/product-by-id', element['seller-sku']]);
  }

  addProduct() {
    this.router.navigate(['/add-products']);
  }

  supplierChangeForProduct(productData) {
    console.log(productData, 'productData')
    try {
      this.loading = true;
      this._authService.postTypeAjax('/seller/assignSupplier', productData).subscribe(() => {
        this.loading = false;
      });
    } catch (e) {
      this.loading = false;
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
}
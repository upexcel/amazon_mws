import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
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
  displayedColumns: string[];
  loading: boolean;
  constructor(private _change: ChangeDetectorRef,
    private _authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  getProduct() {
    this.loading = true;
    try {
      this._authService.getTypeAjax('/seller/RequestReportForproduct/A2WR6NEBQYUU6E').subscribe(res => {
      })
     this.ProductList()
    }
    catch (e) {
      this.loading = false;
    }
  }
  ProductList() {
    this.loading = true;
    try {
      this._authService.getTypeAjax(`/seller/GetProductReportById/A2WR6NEBQYUU6E`).subscribe(res => {
        this.loading = false;
        console.log(res,"***********");
        
        this.getProductList = res
        const data = [
          'asin1',
          'item-name',
          "seller-sku",
          "quantity",
          "price",
          "inbound"
        ]
        this.displayedColumns = data;
        this.dataSource = new MatTableDataSource(this.getProductList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    catch (e) {
      this.loading = false;
    }
  }
  GetMatchingProduct(element) {
    this.router.navigate(["/product-by-id", element['seller-sku']]);
  }
}

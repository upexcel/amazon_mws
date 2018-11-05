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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  constructor(private _change: ChangeDetectorRef,
    private _authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this._authService.getTypeAjax('/seller/RequestReportForproduct/A2WR6NEBQYUU6E').subscribe(res => {
      this.getProducts = res['reportList']['ReportInfo']
      const data = [
        'Report Type',
        'ReportId',
        'ReportRequestId',
        'AvailableDate',
      ]
      this.displayedColumns = data;
      this.dataSource = new MatTableDataSource(this.getProducts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  getProductList(element){
    this.router.navigate(["/product-list",element.ReportId]);
  }
}

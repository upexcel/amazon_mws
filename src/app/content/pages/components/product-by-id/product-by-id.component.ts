import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'm-product-by-id',
  templateUrl: './product-by-id.component.html',
  styleUrls: ['./product-by-id.component.scss']
})
export class ProductByIdComponent implements OnInit {
  sellerSKU: string;
  loading: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  getProductListById;
  constructor(
    private _change: ChangeDetectorRef,
    private _authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => (this.sellerSKU = params.id));
    this.ProductListById();
  }
  ProductListById() {
    this.loading = true;
    this._authService.postTypeAjax('/seller/GetMatchingProductForId/A2WR6NEBQYUU6E', { sellerSKU: this.sellerSKU, MarketplaceId: 'ATVPDKIKX0DER' }).subscribe(res => {
      
      this.getProductListById = [
        {
          id: res['Id'],
          IdType: res['IdType'],
          ASIN: res['Products']['Product']['Identifiers']['MarketplaceASIN']['ASIN'],
          MarketplaceId: res['Products']['Product']['Identifiers']['MarketplaceASIN']['MarketplaceId'],
          PackageQuantity: res['Products']['Product']['AttributeSets']['ItemAttributes']['PackageQuantity'],
          ProductGroup: res['Products']['Product']['AttributeSets']['ItemAttributes']['ProductGroup']
        }]

      this.loading = false;

      this.displayedColumns = [
        'id',
        'ASIN',
        'MarketplaceId',
        "PackageQuantity",
        "ProductTypeName",
        "ProductGroup"
      ];
      this.dataSource = new MatTableDataSource(this.getProductListById);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}

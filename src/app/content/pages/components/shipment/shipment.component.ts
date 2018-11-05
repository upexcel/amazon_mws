import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'm-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {
  shipmentList: any;
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<any>;
  constructor(private _change: ChangeDetectorRef, private _authService: AuthenticationService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    const tableData = [];
    this._authService.getTypeAjax('/seller/ListInboundShipments/A2WR6NEBQYUU6E').subscribe((res) => {
      this.shipmentList = res['ShipmentData']['member'];
      // console.log("this.shipmentList", this.shipmentList)
      this.shipmentList.forEach((value: any) => {
        console.log("*******", { ...value, ...value.ShipFromAddress })
      })
      // console.log("this.shipmentList", this.shipmentList)
      this._change.detectChanges();
    })
  }
  gotoInboundShipments(id) {
    this.router.navigate(['inbound', id]);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

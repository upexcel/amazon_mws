import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'm-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {
  shipmentList: any;
  displayedColumns = [
    'select',
    'ShipmentId',
    'ShipmentName',
    'ShipmentStatus',
    'BoxContentsSource',
    'DestinationFulfillmentCenterId',
    'LabelPrepType',
    'ShipFromAddress'
  ];
  constructor(private _change: ChangeDetectorRef, private _authService: AuthenticationService, private router: Router) { }
  selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    const tableData = [];
    this._authService.getTypeAjax('/seller/ListInboundShipments/A2WR6NEBQYUU6E').subscribe((res) => {
      // console.log("this.shipmentList", this.shipmentList)
      // res['ShipmentData']['member'].forEach((value: any) => {
      //   console.log("*******", { ...value, ...value.ShipFromAddress })
      // });
      this.shipmentList = new MatTableDataSource(res['ShipmentData']['member']);
      this.shipmentList.paginator = this.paginator;
      this.shipmentList.sort = this.sort;
      this._change.detectChanges();
      console.log('this.shipmentList', this.shipmentList)
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.shipmentList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.shipmentList.data.forEach(row => this.selection.select(row));
  }

  gotoInboundShipments(id) {
    this.router.navigate(['inbound', id]);
  }

  applyFilter(filterValue: string) {
    this.shipmentList.filter = filterValue.trim().toLowerCase();

    if (this.shipmentList.paginator) {
      this.shipmentList.paginator.firstPage();
    }
  }
}

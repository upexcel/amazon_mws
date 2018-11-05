import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'm-inboundShipments',
  templateUrl: './inboundShipments.component.html',
  styleUrls: ['./inboundShipments.component.scss']
})
export class InboundShipmentsComponent implements OnInit {
  shipmentData: any;
  displayedColumns = [
    'FulfillmentNetworkSKU',
    'PrepDetailsList',
    'QuantityInCase',
    'QuantityReceived',
    'QuantityShipped',
    'SellerSKU',
    'ShipmentId'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _change: ChangeDetectorRef,
    private _authService: AuthenticationService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe(routeParams => {
      this._authService.getTypeAjax(`/seller/InboundShipmentsById/A2WR6NEBQYUU6E/${routeParams.id}`).subscribe((res) => {
        this.shipmentData = new MatTableDataSource(res['ItemData']['member']);
        this.shipmentData.paginator = this.paginator;
        this.shipmentData.sort = this.sort;
        this._change.detectChanges();
      });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.shipmentData.filter = filterValue;
  }
}

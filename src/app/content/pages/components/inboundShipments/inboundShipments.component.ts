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
  SellerSKUs = ['all'];
  FulfillmentNetworkSKUs = ['all'];
  selectedSellerSku = 'all';
  selectedFulfillmentNetworkSKU = 'all';
  inboundFullData: any;
  constructor(private _change: ChangeDetectorRef,
    private _authService: AuthenticationService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe(routeParams => {
      this._authService.getTypeAjax(`/seller/InboundShipmentsById/A2WR6NEBQYUU6E/${routeParams.id}`).subscribe((res) => {
        this.inboundFullData = Object.assign([], res['ItemData']['member']);
        this.createTable(res['ItemData']['member']);
        this.createFilters(res['ItemData']['member']);
      });
    });
  }

  createTable(data) {
    this.shipmentData = new MatTableDataSource(data)
    this.shipmentData.paginator = this.paginator;
    this.shipmentData.sort = this.sort;
    this._change.detectChanges();
  }

  createFilters(data) {
    console.log(data);
    data.forEach(element => {
      console.log(element)
      this.FulfillmentNetworkSKUs.push(element['FulfillmentNetworkSKU']);
      this.SellerSKUs.push(element['SellerSKU']);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.shipmentData.filter = filterValue;
  }

  selectionFilterChange() {
    if (this.selectedSellerSku === 'all' && this.selectedFulfillmentNetworkSKU === 'all') {
      this.createTable(this.inboundFullData);
    } else if (this.selectedSellerSku === 'all') {
      const newData = [];
      this.inboundFullData.forEach(element => {
        if (element['FulfillmentNetworkSKU'] === this.selectedFulfillmentNetworkSKU) {
          newData.push(element);
        }
        this.createTable(newData);
      });
    } else if (this.selectedFulfillmentNetworkSKU === 'all') {
      const newData = [];
      this.inboundFullData.forEach(element => {
        if (element['SellerSKU'] === this.selectedSellerSku) {
          newData.push(element);
        }
      });
      this.createTable(newData);
    }
  }

}

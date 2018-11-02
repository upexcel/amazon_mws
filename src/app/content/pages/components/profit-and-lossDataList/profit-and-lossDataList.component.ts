import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'm-profit-and-loss',
  templateUrl: './profit-and-lossDataList.component.html',
  styleUrls: ['./profit-and-lossDataList.component.scss']
})
export class ProfitAndLossDataListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  constructor(private _change: ChangeDetectorRef, private _authService: AuthenticationService, ) { }

  ngOnInit() {
    const tableData = [];
    this._authService.getTypeAjax('').subscribe((res) => {
      let obj3;
      res.forEach((value) => {
        if (value.ShipmentEventList) {
          const obj1 = value.ShipmentEventList['ShipmentEvent']
          obj3 = { ...value, ...obj1 }
        }
        tableData.push(
          obj3
        )
      })
      const data = [
        'AmazonOrder Id',
        'Marketplace Name',
        'Posted Date',
        'SellerOrder Id',
        'Shipment Item List',
        'createdAt',
        'seller Id',
        'updatedAt'
      ]
      this.displayedColumns = data;
      this.dataSource = new MatTableDataSource(tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}

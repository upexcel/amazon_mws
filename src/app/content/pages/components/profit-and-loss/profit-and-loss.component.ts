import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'm-profit-and-loss',
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.scss']
})
export class ProfitAndLossComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  tableColom = [];
  table;
  width=100;
  constructor(private _change: ChangeDetectorRef, private _authService: AuthenticationService, ) { }

  ngOnInit() {
    const tableData = [];
    this._authService.getTypeAjax('/pl/getdata').subscribe((res) => {
      res.forEach(value => {
        let key = Object.keys(value);
        let index = key.indexOf("child");
        if (index != -1) {
          var removed = key.splice(index, 1);
        }
        value['keys'] = key;
        if (!this.tableColom.length) {
          let header = JSON.parse(JSON.stringify(key));
          let index = header.indexOf('name');
          if (index !== -1) {
            header[index] = 'Parameter/Date';
          }
          this.tableColom = header;
          this.width= (100/this.tableColom.length);
        }
        if (value.child && value.child.length) {
          value.child.forEach(val => {
            val['keys'] = Object.keys(val);
          })
        }
      })
      this.table = res;
      this._change.detectChanges();
    })
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

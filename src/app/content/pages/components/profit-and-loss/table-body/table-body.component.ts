import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'm-table-body',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss']
})
export class TableBodyComponent implements OnInit {
  @Input() tableData;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      console.log("tableData", this.tableData)
    }, 500)
  }

}

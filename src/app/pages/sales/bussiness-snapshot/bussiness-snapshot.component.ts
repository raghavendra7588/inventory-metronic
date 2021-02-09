import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bussiness-snapshot',
  templateUrl: './bussiness-snapshot.component.html',
  styleUrls: ['./bussiness-snapshot.component.scss']
})
export class BussinessSnapshotComponent implements OnInit {

  displayedColumns = ['type', 'week', 'month', 'year', 'total'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

}

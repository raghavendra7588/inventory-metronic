import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sales-enquiry',
  templateUrl: './sales-enquiry.component.html',
  styleUrls: ['./sales-enquiry.component.scss']
})
export class SalesEnquiryComponent implements OnInit {

  displayedColumns = ['shopName', 'shopKeepersName', 'CategoryName', 'phoneNo', 'city', 'Status', 'name', 'date', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


}

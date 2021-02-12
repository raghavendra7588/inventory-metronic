import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-sales-report',
  templateUrl: './order-sales-report.component.html',
  styleUrls: ['./order-sales-report.component.scss']
})
export class OrderSalesReportComponent implements OnInit {

  reportType: any = [];

  constructor() { }

  ngOnInit(): void {
    this.reportType = [
      {
        id: 0, title: 'Order'
      },
      {
        id: 1, title: 'Sales'
      },
      {
        id: 2, title: 'Customer'
      },
      {
        id: 3, title: 'Sales Enquiry'
      },
    ];
  }

}

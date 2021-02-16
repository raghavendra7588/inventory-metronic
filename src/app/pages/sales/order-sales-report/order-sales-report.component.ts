import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { OrderSalesReport } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-order-sales-report',
  templateUrl: './order-sales-report.component.html',
  styleUrls: ['./order-sales-report.component.scss']
})
export class OrderSalesReportComponent implements OnInit {

  reportType: any = [];


  filteredSellerData: any = [];
  sellerData: any = [];
  role: string;

  sellerName: string;
  startDate: any;
  endDate: any;

  orderSalesReport: OrderSalesReport = new OrderSalesReport();

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) {
    this.role = sessionStorage.getItem('role');
  }

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

    this.getSellerUsers();
  }

  getSellerUsers() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    if (this.role == 'Admin') {
      this.role = 'Seller';
    }
    this.salesService.getSellerUsers(this.role).subscribe(res => {
      this.sellerData = res;
      this.filteredSellerData = this.sellerData.slice();
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
    this.filteredSellerData = this.sellerData.slice();
  }

  fetchReport() {
    console.log('orderSalesReport', this.orderSalesReport);
  }
}

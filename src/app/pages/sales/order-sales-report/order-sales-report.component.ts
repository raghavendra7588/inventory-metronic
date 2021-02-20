import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { AppDateAdapter } from '../../purchase/dialog-content-vendor/date.adapter';
import { OrderSalesReport } from '../sales.model.';
import { SalesService } from '../sales.service';
import { APP_DATE_FORMATS } from './date.adapter';

@Component({
  selector: 'app-order-sales-report',
  templateUrl: './order-sales-report.component.html',
  styleUrls: ['./order-sales-report.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS
    }
  ]
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
  seller: any;

  maxDate: any;

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) {
    this.role = sessionStorage.getItem('role');
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.reportType = [
      {
        id: 0, title: 'Order', name: 'O'
      },
      {
        id: 1, title: 'Sales', name: 'S'
      },
      {
        id: 2, title: 'Customer', name: 'C'
      },
      {
        id: 3, title: 'Sales Enquiry', name: 'E'
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

    this.orderSalesReport.startDate = this.orderSalesReport.startingDate;
    this.orderSalesReport.endDate = this.orderSalesReport.endingDate;

    let startDate = this.valueChanged(this.orderSalesReport.startDate);
    this.orderSalesReport.startDate = startDate;
    console.log('start date', this.orderSalesReport.startDate);

    let endDate = this.valueChanged(this.orderSalesReport.endDate);
    this.orderSalesReport.endDate = endDate;
    console.log('start date', this.orderSalesReport.endDate);

    console.log('orderSalesReport', this.orderSalesReport);

    this.salesService.downloadOrderSalesReport(this.orderSalesReport).subscribe(res => {
      console.log('order sales', res);
      alert('got res');
    });
  }



  valueChanged(provideDate) {
    let date = new Date(provideDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")

    const day = `${date.getDate()}`.padStart(2, "0")

    const stringDate = [day, month, year].join("/");

    return stringDate
  }

  onSellerChange(event, res) {
    this.seller = res.id;
    this.orderSalesReport.sellerName = this.seller;
    console.log('ngmodel seller', this.seller);

  }
}

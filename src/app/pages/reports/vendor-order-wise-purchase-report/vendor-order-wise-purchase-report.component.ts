import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseReport, PurchaseReportData } from '../../purchase/purchase.model';
import { PurchaseService } from '../../purchase/purchase.service';
import { DialogVendorOrderWisePurchaseReportComponent } from '../dialog-vendor-order-wise-purchase-report/dialog-vendor-order-wise-purchase-report.component';
import * as _ from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../product-vendor-wise-purchase-report/date.adapter';
import { SubheaderService } from 'src/app/_metronic/partials/layout';

@Component({
  selector: 'app-vendor-order-wise-purchase-report',
  templateUrl: './vendor-order-wise-purchase-report.component.html',
  styleUrls: ['./vendor-order-wise-purchase-report.component.scss'],
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
export class VendorOrderWisePurchaseReportComponent implements OnInit {

  displayedColumns: string[] = ['vendorName', 'orderNo', 'orderDate', 'deliveryDate', 'batchNo', 'orderedTimeStamp', 'print'];
  dataSource: any;
  dummyData: any;
  vendorData: any;
  vendorId: any;
  sellerId: string;
  purchaseReport: PurchaseReport = new PurchaseReport();
  purchaseReportData: PurchaseReportData = new PurchaseReportData();
  purchaseReportArray: any = [];
  strSellerId: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  maxDate: any;

  constructor(
    public dialog: MatDialog,
    public purchaseService: PurchaseService,
    private spinner: NgxSpinnerService,
    private subheader: SubheaderService
    ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.getVendorData();
    this.sellerId = sessionStorage.getItem('sellerId');
    this.purchaseReportData.sellerId = this.sellerId;
    setTimeout(() => {
      this.subheader.setTitle('Purchase / Vendor Order Wise Purchase Report');
      this.subheader.setBreadcrumbs([{
        title: 'Vendor Order Wise Purchase Report',
        linkText: 'Vendor Order Wise Purchase Report',
        linkPath: '/purchase/vendorOrderWisePurchaseReport'
      }]);
    }, 1);
  }

  viewPurchaseOrder(data) {
    this.dialog.open(DialogVendorOrderWisePurchaseReportComponent, {
      height: '600px',
      width: '1200px',
      data: data
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  selectedVendorFromList(item) {
    this.vendorId = item.vendorId;
  }

  getVendorData() {
    this.spinner.show();
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorData = data;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }

  valueChangedDate(selectedDate) {
    let date = new Date(selectedDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")
    const day = `${date.getDate()}`.padStart(2, "0")
    let stringDate = [year, month, day].join("/");
    return stringDate;
  }

  valueChangedToDate(selectedDate) {
    let date = new Date(selectedDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")
    const day = `${date.getDate() + 1}`.padStart(2, "0")
    let stringDate = '';
    if (day == '32') {
      stringDate = [year, month, '31'].join("/") + ' ' + '23:59:59.999';
    }
    else {
      stringDate = [year, month, day].join("/");
    }
    return stringDate;
  }
  searchRecords() {

    if (this.purchaseReport.vendorId === null || this.purchaseReport.vendorId === undefined || this.purchaseReport.vendorId === '') {
      this.purchaseReportData.vendorId = 'ALL';
    }
    else {
      this.purchaseReportData.vendorId = this.purchaseReport.vendorId;
    }

    if (this.purchaseReport.orderNo === null || this.purchaseReport.orderNo === undefined || this.purchaseReport.orderNo === '') {
      this.purchaseReportData.orderNo = 'ALL';
    }
    else {
      this.purchaseReportData.orderNo = this.purchaseReport.orderNo;
    }

    if (this.purchaseReport.startDate === null || this.purchaseReport.startDate === undefined) {
      this.purchaseReportData.startDate = 'ALL';
    }
    else {
      let startDate = this.valueChangedDate(this.purchaseReport.startDate);
      this.purchaseReportData.startDate = startDate;
    }

    if (this.purchaseReport.endDate === null || this.purchaseReport.endDate === undefined) {
      this.purchaseReportData.endDate = 'ALL';
    }
    else {
      let endDate = this.valueChangedToDate(this.purchaseReport.endDate);
      this.purchaseReportData.endDate = endDate;
    }
    this.purchaseReportData.sellerId = this.sellerId;
    this.purchaseService.getPurchaseReportData(this.purchaseReportData).subscribe(data => {

      this.purchaseReportArray = data;
      let uniqueReceivedPurchaseOrder = _.uniqBy(this.purchaseReportArray, 'PurchaseOrderId');
      this.purchaseReportArray = uniqueReceivedPurchaseOrder;
      this.dataSource = new MatTableDataSource(this.purchaseReportArray);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  purchaseReportAllData() {

    this.spinner.show();
    this.purchaseService.getPurchaseReportData(this.purchaseReport).subscribe(data => {
      this.purchaseReportArray = data;
      this.dataSource = new MatTableDataSource(this.purchaseReportArray);
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }

  clearValues() {
    this.purchaseReport.vendorId = '';
    this.purchaseReport.orderNo = '';
    this.purchaseReport.startDate = '';
    this.purchaseReport.endDate = '';
  }

}

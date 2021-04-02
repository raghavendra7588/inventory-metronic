import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { PurchaseService } from '../../purchase/purchase.service';

@Component({
  selector: 'app-dialog-vendor-order-wise-purchase-report',
  templateUrl: './dialog-vendor-order-wise-purchase-report.component.html',
  styleUrls: ['./dialog-vendor-order-wise-purchase-report.component.scss']
})
export class DialogVendorOrderWisePurchaseReportComponent implements OnInit {
  displayedColumns: string[] = ['ProductName', 'BrandName', 'Name', 'PurchaseQuantity', 'BuyingPrice', 'Discount', 'FinalPrice'];
  dataSource: any;
  data1: any = [];
  vendorData: any = [];
  purchaseReportId: number;
  PurchaseReportDataArray: any = [];
  vendorName: any;
  orderNo: any;
  sellerName: any;
  strSellerId: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public purchaseService: PurchaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogVendorOrderWisePurchaseReportComponent>,
    public router: Router,
    private spinner: NgxSpinnerService) {

    this.sellerName = sessionStorage.getItem('sellerName');
    this.vendorName = data.vendor_name;
    this.orderNo = data.OrderNo;
    // this.getPurchaseReportById(data.PurchaseOrderId);
    this.spinner.show();
    this.purchaseService.getPurchaseReportById(data.PurchaseOrderId).subscribe(data => {
      this.PurchaseReportDataArray = data;
      this.dataSource = new MatTableDataSource(this.PurchaseReportDataArray);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.getVendorData();
  }

  getFinalPrice() {
    let totalFinalPrice = 0;
    this.PurchaseReportDataArray.forEach(item => {
      totalFinalPrice += item.FinalPrice;
    });
    return totalFinalPrice;
  }

  getTotalDiscount() {
    let totalDiscount = 0;
    this.PurchaseReportDataArray.forEach(item => {
      totalDiscount += Number(item.Discount);
    });
    return totalDiscount;
  }

  getTotalQuantity() {
    let totalPurchaseQuantity = 0;
    this.PurchaseReportDataArray.forEach(item => {
      // totalPurchaseQuantity += Number(item.availableQuantity);
      totalPurchaseQuantity += Number(item.PurchaseQuantity);
    });
    return totalPurchaseQuantity;
  }


  getVendorData() {
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorData = data;
    });
  }

  getPurchaseReportById(id: number) {
    this.purchaseService.getPurchaseReportById(id).subscribe(data => {
      this.PurchaseReportDataArray = data;
      let uniqueReceivedPurchaseOrder = _.uniqBy(this.PurchaseReportDataArray, 'PurchaseOrderId');
      this.PurchaseReportDataArray = uniqueReceivedPurchaseOrder;
      this.dataSource = new MatTableDataSource(this.PurchaseReportDataArray);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }


}

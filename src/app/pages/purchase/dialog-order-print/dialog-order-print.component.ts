import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmitterService } from 'src/app/shared/emitter.service';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-dialog-order-print',
  templateUrl: './dialog-order-print.component.html',
  styleUrls: ['./dialog-order-print.component.scss']
})
export class DialogOrderPrintComponent implements OnInit {

  displayedColumns: string[] = ['ProductName', 'BrandName', 'Name', 'PurchaseQuantity', 'BuyingPrice', 'Discount', 'FinalPrice'];
  dataSource: any;
  PurchaseReportDataArray: any = [];
  totalRecords: any = [];
  sellerName: string;
  orderNumber: number;
  vendorName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogOrderPrintComponent>,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    public purchaseService: PurchaseService,
    public router: Router) {
    this.orderNumber = data.OrderNo;
    this.vendorName = data.vendorName;
    this.purchaseService.getPurchaseReportById(data.PurchaseOrderId).subscribe(data => {
      this.PurchaseReportDataArray = data;
      this.totalRecords = data;
      this.dataSource = new MatTableDataSource(this.PurchaseReportDataArray);
    });
    this.sellerName = sessionStorage.getItem('sellerName');

  }

  ngOnInit(): void {
  }

  getFinalPrice() {
    let totalFinalPrice = 0;
    this.totalRecords.forEach(item => {
      totalFinalPrice += item.FinalPrice;
    });
    return totalFinalPrice;
  }

  getTotalDiscount() {
    let totalDiscount = 0;
    this.totalRecords.forEach(item => {
      totalDiscount += item.Discount;
    });
    return totalDiscount;

  }

  getTotalQuantity() {
    let totalQuantity = 0;
    let parsedQuantity: number = 0;
    this.totalRecords.forEach(item => {

      totalQuantity += item.PurchaseQuantity;
    });
    return totalQuantity;
  }

  notPrint() {
    this.dialogRef.close();
    this.router.navigate(['/dashboard']);
  }

}

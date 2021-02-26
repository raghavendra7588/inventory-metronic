import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-order-management-print',
  templateUrl: './dialog-order-management-print.component.html',
  styleUrls: ['./dialog-order-management-print.component.scss']
})
export class DialogOrderManagementPrintComponent implements OnInit {

  displayedColumns = ['productName', 'varient', 'quantity', 'mrp', 'discount', 'finalPrice'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  orderData: any = [];

  totalOrderedQuantity: number;
  totalDiscount: number;
  totalFinalPrice: number;
  orderNo: string;

  constructor(
    private dialogRef: MatDialogRef<DialogOrderManagementPrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    private spinner: NgxSpinnerService
  ) {

    this.orderData = data;
    console.log('order data', this.orderData);
    this.orderNo = this.orderData.orderid;
    console.log('this.orderNo', this.orderNo);
    this.calculateTotalQuantity(this.orderData.orderDetails);
    this.dataSource = new MatTableDataSource(this.orderData.orderDetails);
    setTimeout(() => this.dataSource.paginator = this.paginator);

  }

  ngOnInit(): void {
  }




  calculateTotalQuantity(arr) {
    let totalQuantity: number = 0;
    let totalPrice: number = 0;
    let totalDiscount: number = 0;

    arr.forEach(item => {
      totalQuantity += Number(item.QuantityOrdered);
      totalPrice += Number(item.FinalPrice);
      totalDiscount += Number(item.Discount);
    });
    console.log('totalQuant **', totalQuantity);
    console.log('totalPrice **', totalPrice);
    console.log('totalDiscount **', totalDiscount);
    this.totalOrderedQuantity = totalQuantity;
    this.totalDiscount = totalDiscount;
    this.totalFinalPrice = totalPrice;
  }

  calculateFinalPrice() {
    let totalPrice: number = 0;
    this.orderData.orderDetails.filter(item => {
      totalPrice += Number(item.FinalPrice);
    });
    return totalPrice;
  }
  calculateDiscount() {
    let totalDiscount: number = 0;
    this.orderData.orderDetails.filter(item => {
      totalDiscount += Number(item.Discount);
    });
    return totalDiscount;
  }

  calculateQuantity() {
    let totalQuantity: number = 0;
    this.orderData.orderDetails.filter(item => {
      totalQuantity += Number(item.QuantityOrdered);
    });
    return totalQuantity;
  }
}

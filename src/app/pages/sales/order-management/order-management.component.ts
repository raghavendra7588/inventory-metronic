import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogOrderManagementPrintComponent } from '../dialog-order-management-print/dialog-order-management-print.component';
import { DialogOrderManagementComponent } from '../dialog-order-management/dialog-order-management.component';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  displayedColumns = ['id', 'name', 'customer', 'status', 'orderDate', 'deliveryUpto', 'deliveryType', 'edit', 'print'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  strSellerId: string;
  orderData: any = [];

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    private spinner: NgxSpinnerService
  ) {
    this.strSellerId = sessionStorage.getItem('sellerId');

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getOrderListData(this.strSellerId);
      }
    }, err => {
      this.spinner.hide();
    });
  }

  ngOnInit(): void {
    this.getOrderListData(this.strSellerId);
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editCategory(res) {

  }

  printOrder(res) {

  }

  getOrderListData(userId) {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.getOrderList(userId).subscribe(res => {
      console.log('res', res);
      this.orderData = res;
      this.dataSource = new MatTableDataSource(this.orderData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }

  openOrderDialog(order) {
    this.salesService.currentTab = 'Edit Order Status';
    this.dialog.open(DialogOrderManagementComponent, {
      height: '600px',
      width: '1000px',
      data: order,
      disableClose: true
    });
  }

  openPrintDialog(order) {

    this.dialog.open(DialogOrderManagementPrintComponent, {
      height: '600px',
      width: '1000px',
      data: order,
      disableClose: true
    });
  }
}

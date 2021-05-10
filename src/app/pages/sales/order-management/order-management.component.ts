import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogOrderManagementPrintComponent } from '../dialog-order-management-print/dialog-order-management-print.component';
import { DialogOrderManagementComponent } from '../dialog-order-management/dialog-order-management.component';
import { SalesService } from '../sales.service';
import { ExportToCsv } from 'export-to-csv';
import { SubheaderService } from 'src/app/_metronic/partials/layout';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { PaymentService } from '../../payment/payment.service';

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
  isDataLoaded: boolean = false;
  role: string;
  latestPaymentData: any = [];

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }


  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    private spinner: NgxSpinnerService,
    private subheader: SubheaderService,
    public paymentService: PaymentService,
    public sharedService: SharedService,
    private router: Router
  ) {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.role = sessionStorage.getItem('role');
    if (this.role == 'Admin') {
      this.displayedColumns = ['id', 'name', 'customer', 'status', 'orderDate', 'deliveryUpto', 'deliveryType', 'edit', 'print'];
    }
    else {
      this.displayedColumns = ['id', 'customer', 'status', 'orderDate', 'deliveryUpto', 'deliveryType', 'edit', 'print'];
    }

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

    setTimeout(() => {
      this.subheader.setTitle('Sales / Order');
      this.subheader.setBreadcrumbs([{
        title: 'Order',
        linkText: 'Order',
        linkPath: '/sales/order'
      }]);
    }, 1);
    if (this.role == 'Seller') {
      this.getLatestPaymentTransaction();
    } else {
      return;
    }
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

      this.orderData = res;
      this.dataSource = new MatTableDataSource(this.orderData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
      this.isDataLoaded = true;
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

  downloadTheReport() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Customer Data',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    };

    const csvExporter = new ExportToCsv(options);
    if (this.isDataLoaded) {
      let requiredResponse = this.formatResponse(this.orderData);
      csvExporter.generateCsv(requiredResponse);
    }

  }
  setDataSourceAttributes() {

    if (Array.isArray(this.dataSource) && this.dataSource.length) {
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
  }


  formatResponse(array) {
    let formattedResponse: any = [];
    let j = 1;
    for (let i = 0; i < array.length; i++) {

      let item = {
        Number: j,
        sellerId: array[i].sellerId,
        sellerName: array[i].sellerName,
        customerName: array[i].customerName,
        status: array[i].status,
        orderDate: array[i].orderDate,
        deliveryUpto: array[i].deliveryUpto,
        deliveryType: array[i].deliveryType,
      }
      j++;
      formattedResponse.push(item);
    }
    return formattedResponse;
  }

  getLatestPaymentTransaction() {
    this.spinner.show();
    this.paymentService.getLatestTransactionBySeller(Number(this.strSellerId)).subscribe(res => {
      this.latestPaymentData = res;
      sessionStorage.removeItem('subscriptionDetails');
      sessionStorage.setItem('subscriptionDetails', JSON.stringify(this.latestPaymentData));


      var expiryDate = new Date(this.latestPaymentData[0].ExpiryDatee);
      var currentDate = new Date();

      if (expiryDate > currentDate) {

        this.spinner.hide();
        return;
      } else {

        this.sellerStatusChechpoint(this.latestPaymentData[0].PaymenId);
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }


  sellerStatusChechpoint(PaymenId) {
    this.spinner.show();
    this.paymentService.updateSellerStatusCheckpoint(PaymenId).subscribe(res => {

      this.emitterService.isPaymentOrStatusChange.emit(true);
      this.router.navigate(['/payment/subscription']);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }
}

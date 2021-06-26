import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { SubheaderService } from 'src/app/_metronic/partials/layout';
import { PaymentGateWay } from '../payment.model';
import { PaymentService } from '../payment.service';
import { v4 as uuid } from 'uuid';
import { SalesService } from '../../sales/sales.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-paid-orders-page',
  templateUrl: './paid-orders-page.component.html',
  styleUrls: ['./paid-orders-page.component.scss']
})
export class PaidOrdersPageComponent implements OnInit {

  displayedColumns: string[] = ['customerName', 'orderNumber', 'orderDate', 'orderAmount'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  perOrderAmount: string = '0';
  isHidden: boolean = true;
  makePayment: boolean = false;
  uuidv4Num: string;

  payuform: PaymentGateWay = new PaymentGateWay();
  // payuUrl: string = 'http://localhost:55547/Default.aspx';
  // payuUrl: string = 'https://3intellects.co.in/uat_InventoryService/Default.aspx';
  payuUrl: string = environment.BASE_URL + 'Default.aspx';

  txnid: string;
  sellerContactCredentials: any = [];
  sellerData: any = [];
  strSellerId: string;
  orderData: any = [];
  customOrderData: any = [];
  sellerPaymentData: any = [];
  lastDayOfCurrentMonth: Date;
  subExpiryDate: any;
  subPaymentDate: any;
  isPaymentIsDone: boolean;
  cnt: number;
  diffInDays: number;
  isPaymentValid: boolean = false;
  totalPayableAmount: number = 0;

  lastMonthOrderCount: number;
  currenMonthOrderCount: number;
  isSubscriptionValid: string;
  ordersDataMainResponse: any = [];

  constructor(
    private subheader: SubheaderService,
    public toastr: ToastrService,
    public paymentService: PaymentService,
    public salesService: SalesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.sellerData = JSON.parse(sessionStorage.getItem("sellerData"));
    this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.getSellerContactCredentials(this.strSellerId);
    this.sellerPaymentData = JSON.parse(sessionStorage.getItem("subscriptionDetails"));
    this.perOrderAmount = this.sellerPaymentData[0].Amount;

    this.subExpiryDate = this.sellerPaymentData[0].ExpiryDatee;
    this.subPaymentDate = this.sellerPaymentData[0].PaymentDatee;

    this.diffInDays = moment(this.subExpiryDate).diff(moment(new Date()), 'days');
    if (this.diffInDays <= 4) {
      this.isPaymentValid = true;
    }

    setTimeout(() => {
      this.subheader.setTitle('Per Order Stats');
      this.subheader.setBreadcrumbs([{
        title: 'Per Order Stats',
        linkText: 'Per Order Stats',
        linkPath: '/orderStats'
      }]);
    }, 1);

    this.getOrderListData(this.strSellerId);
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  confirmPayment() {
    if (this.sellerPaymentData[0].PaymentMode == 'Paid Subscription' ||
      this.sellerPaymentData[0].PaymentMode == 'Continue Free') {
      this.toastr.error('Payment Mode Is Mismatched !!');
      return;
    }



    let tempNum = uuid();
    this.uuidv4Num = tempNum.toString().substring(1, 8);

    this.payuform.Name = this.sellerData.name.trim();
    this.payuform.EmailID = (this.sellerContactCredentials[0].Email).trim();
    this.payuform.Amount = this.totalPayableAmount.toString();
    this.payuform.mobilno = (this.sellerContactCredentials[0].MobileNumber).trim();
    this.payuform.currentPaymentMode = this.sellerPaymentData[0].PaymentMode;
    let dateObj = new Date();

    this.txnid = ('web' + 'txnid' + this.uuidv4Num + dateObj.getMilliseconds()).trim();
    let url = new URL(this.payuUrl);
    url.searchParams.set('Name', this.payuform.Name.trim());
    url.searchParams.set('EmailID', this.payuform.EmailID.trim());
    url.searchParams.set('Amount', this.payuform.Amount);
    url.searchParams.set('mobileno', this.payuform.mobilno.toString().trim());
    url.searchParams.set('TransationID', this.txnid.toString().trim());

    this.payuUrl = url.href;
    this.paymentService.pUrl = url.href;

    this.makePayment = true;
    sessionStorage.removeItem("paymentRequest");
    sessionStorage.setItem("paymentRequest", JSON.stringify(this.payuform));

    this.toastr.success('Please Hit Confirm To Continue');
  }

  getSellerContactCredentials(sellerId) {
    this.paymentService.getSellerCredentials(sellerId).subscribe(res => {
      this.sellerContactCredentials = res;
      this.payuform.EmailID = this.sellerContactCredentials[0].Email;
      this.payuform.mobilno = this.sellerContactCredentials[0].MobileNumber;
    });
  }

  getOrderListData(userId) {
    this.spinner.show();
    this.salesService.getOrderList(userId).subscribe(res => {
      this.ordersDataMainResponse = res;
      this.orderData = this.formatOrdersDataResponse(res);
      this.filterOrderDatesInMonthRange(this.orderData);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }


  formatOrdersDataResponse(ordersData) {
    let customOrderObject: any = [];

    for (var i = 0; i < ordersData.length; i++) {

      let dateArray = ordersData[i].orderDate.split(" ");
      let splittedDateArray = dateArray[0].split("-");
      let formattedDate = splittedDateArray[1] + "/" + splittedDateArray[0] + "/" + splittedDateArray[2];

      customOrderObject.push({
        orderDate: (ordersData[i].orderDate),
        customOrderDate: (new Date(formattedDate)),
        orderid: ordersData[i].orderid.substr(ordersData[i].orderid.length - 5),
        customerName: ordersData[i].customerName,
        totalOrderAmount: ordersData[i].totalAmount
      });


    }

    return customOrderObject;
  }

  filterOrderDatesInMonthRange(orderData) {
    let filteredOrderData: any = [];



    let startDateOfCurrentMonth = moment().clone().startOf('month').toDate();
    let lastDateOfCurrentMonth = moment().clone().endOf('month').toDate();

    var dateFromTwo = moment(dateFromTwo).subtract(1, 'months').startOf('month').toDate();
    var dateFrom = moment(dateFrom).subtract(1, 'months').endOf('month').toDate();

    let lastMonthStartDate = dateFromTwo;
    let lastMonthLastDate = dateFrom;

    let startDateOfNextMonth = moment().add(1, 'M').startOf('month').toDate();

    let fithDayOfNextMonth = new Date(startDateOfNextMonth);
    fithDayOfNextMonth.setDate(fithDayOfNextMonth.getDate() + Number(4));

    let fifthDayOfCurrentMonth = new Date(startDateOfCurrentMonth);
    fifthDayOfCurrentMonth.setDate(fifthDayOfCurrentMonth.getDate() + Number(4));


    if (this.diffInDays <= 4 && this.isSubscriptionValid == 'ACTIVE') {
      if (this.diffInDays >= 0) {

        this.currenMonthOrderCount = 0;
        this.lastMonthOrderCount = 0;

        for (var i = 0; i < this.ordersDataMainResponse.length; i++) {
          if ((new Date(orderData[i].customOrderDate).getTime()) >= (new Date(lastMonthStartDate).getTime())) {
            if ((new Date(orderData[i].customOrderDate).getTime()) <= (new Date(lastMonthLastDate).getTime())) {
              this.lastMonthOrderCount++;
            }
          }
        }


        for (var i = 0; i < orderData.length; i++) {
          if ((new Date(orderData[i].customOrderDate).getTime()) >= (new Date(startDateOfCurrentMonth).getTime())) {
            if ((new Date(orderData[i].customOrderDate).getTime()) <= (new Date(fifthDayOfCurrentMonth).getTime())) {
              this.currenMonthOrderCount++;
            }
          }
        }



        this.cnt = 0;

        for (var i = 0; i < orderData.length; i++) {
          if ((new Date(orderData[i].customOrderDate).getTime()) >= (new Date(lastMonthStartDate).getTime())) {
            if ((new Date(orderData[i].customOrderDate).getTime()) <= (new Date(fifthDayOfCurrentMonth).getTime())) {
              this.cnt++;
              filteredOrderData.push({
                customOrderDate: orderData[i].customOrderDate,
                customerName: orderData[i].customerName,
                orderDate: orderData[i].orderDate,
                orderid: orderData[i].orderid,
                totalOrderAmount: orderData[i].totalOrderAmount,
                serialNo: this.cnt
              });
            }
          }
        }
        let nonDuplicateOrders = _.uniqBy(filteredOrderData, 'orderid');
        this.ordersDataMainResponse = nonDuplicateOrders;
        this.totalPayableAmount = Number(this.perOrderAmount) * (nonDuplicateOrders.length);
        this.dataSource = new MatTableDataSource(nonDuplicateOrders);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      }
    }


    if (this.diffInDays >= 5 && this.isSubscriptionValid == 'ACTIVE') {
      if (this.diffInDays < 32) {

        this.cnt = 0;

        for (var i = 0; i < orderData.length; i++) {
          if ((new Date(orderData[i].customOrderDate).getTime()) >= (new Date(startDateOfCurrentMonth).getTime())) {

            if ((new Date(orderData[i].customOrderDate).getTime()) <= (new Date(fithDayOfNextMonth).getTime())) {
              this.cnt++;
              filteredOrderData.push({
                customOrderDate: orderData[i].customOrderDate,
                customerName: orderData[i].customerName,
                orderDate: orderData[i].orderDate,
                orderid: orderData[i].orderid,
                totalOrderAmount: orderData[i].totalOrderAmount,
                serialNo: this.cnt
              });
            }
          }
        }
        let nonDuplicateOrders = _.uniqBy(filteredOrderData, 'orderid');
        this.ordersDataMainResponse = nonDuplicateOrders;
        this.dataSource = new MatTableDataSource(nonDuplicateOrders);
        setTimeout(() => this.dataSource.paginator = this.paginator);

      }
    }
    if (this.diffInDays < 0) {

      let pastPaymentStartDate = moment(this.subPaymentDate).startOf('month').toDate();

      this.cnt = 0;

      for (var i = 0; i < orderData.length; i++) {
        if ((new Date(orderData[i].customOrderDate).getTime()) >= (new Date(pastPaymentStartDate).getTime())) {
          if ((new Date(orderData[i].customOrderDate).getTime()) <= (new Date(startDateOfCurrentMonth).getTime())) {
            this.cnt++;
            filteredOrderData.push({
              customOrderDate: orderData[i].customOrderDate,
              customerName: orderData[i].customerName,
              orderDate: orderData[i].orderDate,
              orderid: orderData[i].orderid,
              totalOrderAmount: orderData[i].totalOrderAmount,
              serialNo: this.cnt
            });
          }
        }
      }
      let nonDuplicateOrders = _.uniqBy(filteredOrderData, 'orderid');
      this.totalPayableAmount = Number(nonDuplicateOrders.length) * Number(this.perOrderAmount);
      this.ordersDataMainResponse = nonDuplicateOrders;
      this.dataSource = new MatTableDataSource(nonDuplicateOrders);
      setTimeout(() => this.dataSource.paginator = this.paginator);

    }
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
    let formattedRes = this.formatResponse(this.ordersDataMainResponse);
    csvExporter.generateCsv(formattedRes);
  }

  formatResponse(ordersData) {
    let formattedResponse: any = [];
    let j = 1;
    for (let i = 0; i < ordersData.length; i++) {
      let item = {
        SerialNo: j,
        OrderDate: (ordersData[i].orderDate),
        Orderid: ordersData[i].orderid,
        CustomerName: ordersData[i].customerName,
        TotalOrderAmount: ordersData[i].totalOrderAmount
      }
      j++;
      formattedResponse.push(item);
    }
    return formattedResponse;
  }

}

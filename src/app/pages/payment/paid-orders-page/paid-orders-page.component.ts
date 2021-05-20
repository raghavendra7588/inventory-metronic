import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { SubheaderService } from 'src/app/_metronic/partials/layout';

import { PaymentGateWay } from '../payment.model';
import { PaymentService } from '../payment.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-paid-orders-page',
  templateUrl: './paid-orders-page.component.html',
  styleUrls: ['./paid-orders-page.component.scss']
})
export class PaidOrdersPageComponent implements OnInit {

  displayedColumns: string[] = ['serialNo', 'orderDate', 'orderNumber', 'customerName', 'orderAmount'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  perOrderAmount: string;
  isHidden: boolean = true;
  makePayment: boolean = false;
  uuidv4Num: string;

  payuform: PaymentGateWay = new PaymentGateWay();
  payuUrl: string = 'http://localhost:55547/Default.aspx';
  txnid: string;
  sellerContactCredentials: any = [];
  sellerData: any = [];
  strSellerId: string;

  constructor(
    private subheader: SubheaderService,
    public toastr: ToastrService,
    public paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.perOrderAmount = '0';
    this.sellerData = JSON.parse(sessionStorage.getItem("sellerData"));
   
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.getSellerContactCredentials(this.strSellerId);

    setTimeout(() => {
      this.subheader.setTitle('Per Order Stats');
      this.subheader.setBreadcrumbs([{
        title: 'Per Order Stats',
        linkText: 'Per Order Stats',
        linkPath: '/orderStats'
      }]);
    }, 1);
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  confirmPayment() {

    let tempNum = uuid();
    this.uuidv4Num = tempNum.toString().substring(1, 8);

    this.payuform.Name = this.sellerData.name.trim();
    this.payuform.EmailID = (this.sellerContactCredentials[0].Email).trim();
    this.payuform.Amount = '10';
    this.payuform.mobilno = (this.sellerContactCredentials[0].MobileNumber).trim();

    let dateObj = new Date();

    this.txnid = ('web' + 'txnid' + this.uuidv4Num + dateObj.getMilliseconds());
    let url = new URL(this.payuUrl);
    url.searchParams.set('Name', this.payuform.Name);
    url.searchParams.set('EmailID', this.payuform.EmailID);
    url.searchParams.set('Amount', this.payuform.Amount);
    url.searchParams.set('mobileno', this.payuform.mobilno.toString());
    url.searchParams.set('TransationID', this.txnid.toString());

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
     
    });
  }

}

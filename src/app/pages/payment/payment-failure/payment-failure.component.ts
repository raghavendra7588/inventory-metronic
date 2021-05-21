import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SubheaderService } from 'src/app/_metronic/partials/layout';
import { PaymentSuccessAndFailure } from '../payment.model';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-failure',
  templateUrl: './payment-failure.component.html',
  styleUrls: ['./payment-failure.component.scss']
})
export class PaymentFailureComponent implements OnInit {


  storagePaymentRequest: any = [];
  paymentSuccessAndFailure: PaymentSuccessAndFailure = new PaymentSuccessAndFailure();
  latestPaymentData: any = [];
  strSellerId: string;
  role: string;

  constructor(
    private router: Router,
    public toastr: ToastrService,
    private subheader: SubheaderService,
    private spinner: NgxSpinnerService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    public emitterService: EmitterService
  ) {

    this.strSellerId = sessionStorage.getItem('sellerId').toString();

    this.route.queryParams.subscribe(params => {
      this.paymentSuccessAndFailure.TrasnsactionId = params['TransationID'];

    });
  }

  ngOnInit(): void {


    this.getLatestPaymentTransaction();

    setTimeout(() => {
      this.subheader.setTitle('Payment');
      this.subheader.setBreadcrumbs([{
        title: 'Successs',
        linkText: 'Successs',
        linkPath: '/success'
      }]);
    }, 1);
  }

  tryAgain() {
    this.router.navigate(['/payment/subscription']);
  }

  getLatestPaymentTransaction() {
    this.spinner.show();

    this.paymentService.getLatestTransactionBySeller(Number(this.strSellerId)).subscribe(res => {
      this.latestPaymentData = res;

      sessionStorage.removeItem('subscriptionDetails');
      sessionStorage.setItem('subscriptionDetails', JSON.stringify(this.latestPaymentData));

      this.storagePaymentRequest = JSON.parse(sessionStorage.getItem("paymentRequest"));
      this.spinner.hide();

      this.paymentSuccessAndFailure.SellerId = this.strSellerId;
      this.paymentSuccessAndFailure.TrasnsactionId = this.paymentSuccessAndFailure.TrasnsactionId;
      this.paymentSuccessAndFailure.Amount = this.storagePaymentRequest.Amount.toString();

      this.paymentSuccessAndFailure.VendorCode = this.latestPaymentData[0].VendorCode;
      this.paymentSuccessAndFailure.VendorName = this.latestPaymentData[0].VendorName;

      if (this.latestPaymentData[0].SubscriptionIsActive == 'ACTIVE') {
        this.paymentSuccessAndFailure.CurrentStatus = 'INACTIVE-FAIL';
      }
      else {
        this.paymentSuccessAndFailure.CurrentStatus = 'INACTIVE';
      }

      this.paymentSuccessAndFailure.PaymentId = Number(this.latestPaymentData[0].PaymenId);
      let moment = require('moment');
      this.paymentSuccessAndFailure.NewExpiryDate = moment(new Date()).format('YYYY-MM-DD');
      this.paymentSuccessAndFailure.SubscritpionStartDate = moment(new Date()).format('YYYY-MM-DD');
      this.updatePaymentDetailsData(this.paymentSuccessAndFailure);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  updatePaymentDetailsData(paymentSuccessAndFailure) {
    this.paymentService.updatePaymentData(paymentSuccessAndFailure).subscribe(res => {

      sessionStorage.removeItem('isSubscriptionValid');
      sessionStorage.removeItem('paymentRequest');
      if (this.latestPaymentData[0].SubscriptionIsActive == 'ACTIVE') {
        sessionStorage.setItem('isSubscriptionValid', 'ACTIVE');
        this.emitterService.isPaymentOrStatusActivated.emit(true);
      }
      else {
        sessionStorage.setItem('isSubscriptionValid', 'INACTIVE');
        this.emitterService.isPaymentOrStatusChange.emit(true);
      }
      this.spinner.hide();
      this.toastr.error('Your Transaction Is Failed', '', {
        timeOut: 3000,
      });
    }, err => {
      this.spinner.hide();
    });
  }
}

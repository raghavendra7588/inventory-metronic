import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SubheaderService } from 'src/app/_metronic/partials/layout';
import { PaymentSuccessAndFailure } from '../payment.model';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  storagePaymentRequest: any = [];
  paymentSuccessAndFailure: PaymentSuccessAndFailure = new PaymentSuccessAndFailure();
  latestPaymentData: any = [];
  strSellerId: string;

  constructor(
    private router: Router,
    public toastr: ToastrService,
    private subheader: SubheaderService,
    private spinner: NgxSpinnerService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    public emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId').toString();

    this.route.queryParams.subscribe(params => {
      this.paymentSuccessAndFailure.TrasnsactionId = params['TransationID'];

    });
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

  continueToDashboard() {
    this.router.navigate(['']);
  }


  getLatestPaymentTransaction() {

    this.spinner.show();
    var totalDaysBasedOnAmount: number = 0;
    this.paymentService.getLatestTransactionBySeller(Number(this.strSellerId)).subscribe(res => {
      this.latestPaymentData = res;
     
      sessionStorage.removeItem('subscriptionDetails');
      sessionStorage.setItem('subscriptionDetails', JSON.stringify(this.latestPaymentData));

      this.storagePaymentRequest = JSON.parse(sessionStorage.getItem("paymentRequest"));


      this.paymentSuccessAndFailure.SellerId = this.strSellerId;
      this.paymentSuccessAndFailure.TrasnsactionId = this.paymentSuccessAndFailure.TrasnsactionId;
      this.paymentSuccessAndFailure.Amount = this.storagePaymentRequest.Amount.toString();
      this.paymentSuccessAndFailure.CurrentStatus = 'ACTIVE';
      this.paymentSuccessAndFailure.VendorCode = this.latestPaymentData[0].VendorCode;
      this.paymentSuccessAndFailure.VendorName = this.latestPaymentData[0].VendorName;


      let moment = require('moment');

      var expiryDate = new Date(this.latestPaymentData[0].ExpiryDatee);
      var currentDate = new Date();


      if (Number(this.storagePaymentRequest.Amount) == 320) {
        totalDaysBasedOnAmount = 30;
      }
      if (Number(this.storagePaymentRequest.Amount) == 900) {
        totalDaysBasedOnAmount = 90;
      }
      if (Number(this.storagePaymentRequest.Amount) == 1600) {
        totalDaysBasedOnAmount = 180;
      }
      if (Number(this.storagePaymentRequest.Amount) == 3000) {
        totalDaysBasedOnAmount = 365;
      }

      if (expiryDate > currentDate) {

        let paymentExpiryDate = moment(this.latestPaymentData[0].ExpiryDatee).format('YYYY-MM-DD');
        let currentPaymentDate = moment(this.latestPaymentData[0].PaymentDatee).format('YYYY-MM-DD');


        let diffInDays = moment(paymentExpiryDate).diff(moment(currentPaymentDate), 'days');
        let todaysDate = new Date(this.latestPaymentData[0].ExpiryDatee);
        let subscriptionStartDate = new Date(this.latestPaymentData[0].ExpiryDatee);



        todaysDate.setDate(todaysDate.getDate() + Number(totalDaysBasedOnAmount));
        let d = new Date(todaysDate);
        let finalDate = moment(d).format('YYYY-MM-DD');

        subscriptionStartDate.setDate(subscriptionStartDate.getDate() + Number(1));
        let da = new Date(subscriptionStartDate);
        let finalSubscriptionStartDate = moment(da).format('YYYY-MM-DD');

        this.paymentSuccessAndFailure.NewExpiryDate = finalDate.toString();
        this.paymentSuccessAndFailure.SubscritpionStartDate = finalSubscriptionStartDate.toString();

      } else {
        // let todaysDate = new Date(this.latestPaymentData[0].ExpiryDatee);
        let todaysDate = new Date();
        todaysDate.setDate(todaysDate.getDate() + Number(totalDaysBasedOnAmount));
        let d = new Date(todaysDate);
        let finalDate = moment(d).format('YYYY-MM-DD');

        this.paymentSuccessAndFailure.NewExpiryDate = finalDate.toString();
        this.paymentSuccessAndFailure.SubscritpionStartDate = moment(new Date()).format('YYYY-MM-DD');
      }
      this.paymentSuccessAndFailure.PaymentId = Number(this.latestPaymentData[0].PaymenId);
   
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
      sessionStorage.setItem('isSubscriptionValid', 'ACTIVE');
      this.toastr.success('Your Subscription Is Activated', '', {
        timeOut: 3000,
      });
      this.emitterService.isPaymentOrStatusActivated.emit(true);
    });
  }

}

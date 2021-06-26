import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../purchase/dialog-content-vendor/date.adapter';
import { ActiveStatus, ActivityStatusChange, AdminSellerActiveInActive } from '../payment.model';
import { PaymentService } from '../payment.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-seller-active-inactive',
  templateUrl: './dialog-seller-active-inactive.component.html',
  styleUrls: ['./dialog-seller-active-inactive.component.scss'],
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
export class DialogSellerActiveInactiveComponent implements OnInit {

  strSellerId: string;
  sellerPaymentInformation: any = [];
  sellerData: any = [];
  minDate: any;
  activityStatusChange: ActivityStatusChange = new ActivityStatusChange();
  adminSellerActiveInActive: AdminSellerActiveInActive = new AdminSellerActiveInActive();
  finalActiveStatus: ActiveStatus = new ActiveStatus();
  modalRef: BsModalRef;
  inActiveToActiveModalRef: BsModalRef;
  invalidUptoDate: any;
  isButtonDisabled: boolean = false;
  date: Date;
  isSubscriptionValid: string;

  subDaysCnt: number;
  inactiveDaysCnt: number;
  subExpiryDate: string;
  subPaymentDate: string;
  transactionHistoryData: any = [];
  currentDate: any;
  currentTransactionData: any = [];
  sellerProfileData: any = [];

  constructor(
    private router: Router,
    public paymentService: PaymentService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogSellerActiveInactiveComponent>,
    private modalService: BsModalService,
    public toastr: ToastrService,
    public emitterService: EmitterService
  ) {
    this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.sellerData = JSON.parse(sessionStorage.getItem("sellerData"));
    this.sellerPaymentInformation = data;
    if (this.isSubscriptionValid == 'INACTIVE') {
      this.getTransactionHistoryDetails();
      this.activityStatusChange = this.transactionHistoryData;
    }
  }

  ngOnInit(): void {
    let tempPaymentDate = new Date(this.sellerPaymentInformation[0].CreateOn);
    this.minDate = tempPaymentDate;
    this.activityStatusChange.sellerId = this.strSellerId;
    this.assignValues();

    this.adminSellerActiveInActive.id = this.strSellerId;

    this.adminSellerActiveInActive.Vendorcode = this.sellerData.vendorcode;
  }


  assignValues() {
    this.activityStatusChange.paymentMode = this.sellerPaymentInformation[0].PaymentMode;
    this.activityStatusChange.paymentDate = this.sellerPaymentInformation[0].PaymentDate;
    this.activityStatusChange.expiryDate = this.sellerPaymentInformation[0].ExpiryDate;
  }

  openModal(template: TemplateRef<any>) {
    this.isButtonDisabled = true;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

  }

  confirm(): void {
    if (this.activityStatusChange.InactiveReason === null || this.activityStatusChange.InactiveReason === undefined
      || this.activityStatusChange.InactiveReason === '') {
      this.activityStatusChange.InactiveReason = 'Default InActive Message';
      this.finalActiveStatus.InactiveReason = this.activityStatusChange.InactiveReason;
      this.adminSellerActiveInActive.tempInActiveMsg = this.activityStatusChange.InactiveReason;
    }
    this.finalActiveStatus.InactiveReason = this.activityStatusChange.InactiveReason;
    this.adminSellerActiveInActive.tempInActiveMsg = this.activityStatusChange.InactiveReason;

    this.activityStatusChange.inActivatedDate = moment(new Date()).format('YYYY-MM-DD');

    this.activityStatusChange.updatedExpiryDate = moment(new Date()).format('YYYY-MM-DD');

    this.finalActiveStatus.sellerId = this.strSellerId;
    this.finalActiveStatus.CurrentStatus = this.sellerPaymentInformation[0].SubscriptionIsActive;
    this.finalActiveStatus.inActivatedDate = this.activityStatusChange.inActivatedDate;
    this.finalActiveStatus.updatedExpiryDate = this.activityStatusChange.updatedExpiryDate;

    this.adminSellerActiveInActive.tempInActiveFlag = 'Y';

    this.spinner.show();
    this.paymentService.updateAdminSellerActiveInActive(this.adminSellerActiveInActive).subscribe(res => {
      this.spinner.hide();
      this.paymentService.updateActiveStatus(this.finalActiveStatus).subscribe(res => {
        this.spinner.hide();
        this.getCurrentSellerTransaction();
        this.emitterService.isPaymentOrStatusChange.emit(true);
        sessionStorage.removeItem('isSubscriptionValid');
        sessionStorage.setItem('isSubscriptionValid', 'INACTIVE');
        this.router.navigate(['/payment/subscription']);
        this.toastr.error('Seller Is InActived Successfully !!');
      }, err => {
        this.spinner.hide();
        this.toastr.error('Please Check API Is Running Or Not !!');
      });
    }, err => {
      this.spinner.hide();
      this.toastr.error('Please Check API Is Running Or Not !!');
    });



    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }



  inActiveToActiveOpenModal(template: TemplateRef<any>) {
    this.sellerPaymentInformation = this.transactionHistoryData;
    let moment = require('moment');
    this.subPaymentDate = moment(this.sellerPaymentInformation[0].PaymentDatee).format('YYYY-MM-DD');
    this.subExpiryDate = moment(this.sellerPaymentInformation[0].ExpiryDatee).format('YYYY-MM-DD');

    let diffInDays = moment(this.subExpiryDate).diff(moment(this.subPaymentDate), 'days');
    this.subDaysCnt = diffInDays;


    if (Number(this.subDaysCnt) < 0) {
      this.toastr.error('Your Subscription Is Expired');
      return;
    }
    else {
      this.inActiveToActiveModalRef = this.modalService.show(template, { class: 'modal-sm' });
    }



  }

  inActiveToActiveConfirm(): void {

    this.activityStatusChange.CurrentStatus = this.sellerPaymentInformation[0].SubscriptionIsActive;
    this.activityStatusChange.InactiveReason = ' ';
    this.activityStatusChange.inActivatedDate = moment(new Date()).format('YYYY-MM-DD');



    this.finalActiveStatus.sellerId = this.strSellerId;
    this.finalActiveStatus.CurrentStatus = this.sellerPaymentInformation[0].SubscriptionIsActive;
    this.finalActiveStatus.InactiveReason = '';
    this.finalActiveStatus.inActivatedDate = moment(new Date()).format('YYYY-MM-DD');


    this.adminSellerActiveInActive.tempInActiveFlag = 'N';
    this.adminSellerActiveInActive.tempInActiveMsg = '';

    this.spinner.show();
    this.paymentService.updateAdminSellerActiveInActive(this.adminSellerActiveInActive).subscribe(res => {
      this.spinner.hide();
      this.paymentService.updateActiveStatus(this.finalActiveStatus).subscribe(res => {
        this.getCurrentSellerTransaction();
        this.spinner.hide();
        this.emitterService.isPaymentOrStatusActivated.emit(true);
        sessionStorage.removeItem('isSubscriptionValid');
        sessionStorage.setItem('isSubscriptionValid', 'ACTIVE');
        this.router.navigate(['/dashboard']);
        this.toastr.success('Seller Is Actived Successfully !!');       
      }, err => {
        this.spinner.hide();
        this.toastr.error('Please Check API Is Running Or Not !!');
      });
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error('Please Check API Is Running Or Not !!');
    });



    this.inActiveToActiveModalRef.hide();
  }

  inActiveToActiveDecline(): void {

    this.inActiveToActiveModalRef.hide();
  }

  getTransactionHistoryDetails() {
    this.spinner.show();
    this.paymentService.getLatestTransactionBySeller(Number(this.strSellerId)).subscribe(res => {

      this.transactionHistoryData = res;
      this.spinner.hide();

      this.activityStatusChange.CurrentStatus = this.transactionHistoryData[0].SubscriptionIsActive;
      let currentDate = new Date();
      let inActivatedOn = this.transactionHistoryData[0].InActivatedDateOn;


      let moment = require('moment');
      let diffInDays = moment(currentDate).diff(moment(inActivatedOn), 'days');

      this.inactiveDaysCnt = diffInDays;

      this.date = new Date(this.transactionHistoryData[0].ExpiryDatee);
      this.date.setDate(this.date.getDate() + Number(this.inactiveDaysCnt));
      let d = new Date(this.date);
      let finalDate = moment(d).format('YYYY-MM-DD');

      this.finalActiveStatus.updatedExpiryDate = finalDate;
    }, err => {
      this.spinner.hide();
    });
  }

  getCurrentSellerTransaction() {
    this.spinner.show();
    this.paymentService.getLatestTransactionBySeller(Number(this.strSellerId)).subscribe(res => {
      this.currentTransactionData = res;
      sessionStorage.removeItem('subscriptionDetails');
      sessionStorage.setItem('subscriptionDetails', JSON.stringify(this.currentTransactionData));
      this.spinner.hide();
      this.dialogRef.close();
    },
      err => {
        this.spinner.hide();
      });
  }





}
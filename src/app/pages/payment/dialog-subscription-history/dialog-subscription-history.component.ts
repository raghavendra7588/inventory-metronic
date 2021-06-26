import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { PaymentService } from '../payment.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dialog-subscription-history',
  templateUrl: './dialog-subscription-history.component.html',
  styleUrls: ['./dialog-subscription-history.component.scss']
})
export class DialogSubscriptionHistoryComponent implements OnInit {

  sellerData: any = [];
  // displayedColumns: string[] = ['paymentMode', 'SubscriptionIsActive', 'TransactionID', 'Amount', 'PaymentDate', 'SubcriptionStartDate', 'ExpiryDate'];
  displayedColumns: string[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  transactionHistoryData: any = [];
  strSellerId: string;
  subscriptionStatus: string;
  sellerPaymentData: any = [];
  currentPaymentMode: string;

  constructor(
    private paymentService: PaymentService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<DialogSubscriptionHistoryComponent>,
    private emitterService: EmitterService
  ) {
    this.sellerData = JSON.parse(sessionStorage.getItem("sellerData"));

    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.subscriptionStatus = sessionStorage.getItem('isSubscriptionValid').toString();

    this.sellerPaymentData = JSON.parse(sessionStorage.getItem("subscriptionDetails"));
    this.currentPaymentMode = this.sellerPaymentData[0].PaymentMode;

  }

  ngOnInit(): void {

    if (this.sellerPaymentData[0].PaymentMode != 'Per Order Subscription'.trim()) {

      this.displayedColumns = ['paymentMode', 'SubscriptionIsActive', 'TransactionID', 'Amount', 'PaymentDate', 'SubcriptionStartDate', 'ExpiryDate'];
    }
    if (this.sellerPaymentData[0].PaymentMode == 'Per Order Subscription'.trim()) {

      this.displayedColumns = ['paymentMode', 'SubscriptionIsActive', 'TransactionID', 'Amount', 'PaymentDate', 'ExpiryDate'];
    }

    this.getTransactionHistoryDetails();
  }

  getTransactionHistoryDetails() {
    this.spinner.show();
    this.paymentService.getTransactionHistory(Number(this.strSellerId)).subscribe(res => {

      this.transactionHistoryData = res;

      let uniqueTransactions = _.uniqBy(this.transactionHistoryData, 'PaymenId');
      this.transactionHistoryData = uniqueTransactions;
      let formatedResponse = this.formatResponseAsPerPaymentMode(this.transactionHistoryData);

      this.transactionHistoryData = formatedResponse;
      this.dataSource = new MatTableDataSource(this.transactionHistoryData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  formatResponseAsPerPaymentMode(transactionsData) {
    let customFormattedData: any = [];
    let tempData: any = [];

    if (this.currentPaymentMode == 'Per Order Subscription') {
      for (var i = 0; i < transactionsData.length; i++) {

        if (transactionsData[i].PaymentMode == 'Per Order Subscription') {
          tempData.push(transactionsData[i]);
        }
      }
      customFormattedData = tempData;
    }

    else {
      for (var i = 0; i < transactionsData.length; i++) {

        if (transactionsData[i].PaymentMode != 'Per Order Subscription') {
          tempData.push(transactionsData[i]);
        }
      }
      customFormattedData = tempData;
    }
    return customFormattedData
  }

  closeDialog() {
    this.emitterService.isDialogClosed.emit(true);
    this.dialogRef.close();
  }
}

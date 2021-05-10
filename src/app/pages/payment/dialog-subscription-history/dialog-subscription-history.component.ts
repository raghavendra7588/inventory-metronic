import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-dialog-subscription-history',
  templateUrl: './dialog-subscription-history.component.html',
  styleUrls: ['./dialog-subscription-history.component.scss']
})
export class DialogSubscriptionHistoryComponent implements OnInit {

  sellerData: any = [];
  displayedColumns: string[] = ['paymentMode', 'SubscriptionIsActive', 'TransactionID', 'Amount', 'PaymentDate', 'SubcriptionStartDate', 'ExpiryDate'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  transactionHistoryData: any = [];
  strSellerId: string;
  subscriptionStatus: string;

  constructor(
    private paymentService: PaymentService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<DialogSubscriptionHistoryComponent>,
    private emitterService: EmitterService
  ) {
    this.sellerData = JSON.parse(sessionStorage.getItem("sellerData"));

    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.subscriptionStatus = sessionStorage.getItem('isSubscriptionValid').toString();
  }

  ngOnInit(): void {
    this.getTransactionHistoryDetails();
  }

  getTransactionHistoryDetails() {
    this.spinner.show();
    this.paymentService.getTransactionHistory(Number(this.strSellerId)).subscribe(res => {

      this.transactionHistoryData = res;
      this.dataSource = new MatTableDataSource(this.transactionHistoryData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  closeDialog() {
    this.emitterService.isDialogClosed.emit(true);
    this.dialogRef.close();
  }
}

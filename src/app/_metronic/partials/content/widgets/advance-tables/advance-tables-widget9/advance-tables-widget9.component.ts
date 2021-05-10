import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentService } from 'src/app/pages/payment/payment.service';
import { DialogOrderManagementComponent } from 'src/app/pages/sales/dialog-order-management/dialog-order-management.component';
import { SalesService } from 'src/app/pages/sales/sales.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-advance-tables-widget9',
  templateUrl: './advance-tables-widget9.component.html',
})
export class AdvanceTablesWidget9Component implements OnInit {
  @Input() cssClass;
  orderData: any = [];
  strSellerId: string;
  latestPaymentData: any = [];
  role: string;

  constructor(
    public salesService: SalesService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    public paymentService: PaymentService,
    public sharedService: SharedService,
    private router: Router,
    public emitterService: EmitterService
  ) {

    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.role = sessionStorage.getItem('role');
    this.getOrderListData(this.strSellerId);
  }

  ngOnInit() {
    if (this.role == 'Seller') {
      this.getLatestPaymentTransaction();
    } else {
      return;
    }
  }

  getOrderListData(userId) {
    this.spinner.show();
    this.salesService.getOrderList(userId).subscribe(res => {

      this.orderData = res;
      let sortedArray = this.orderData.sort((a, b) => parseFloat(b.totalAmount) - parseFloat(a.totalAmount));
      this.orderData = this.extractTopOrders(sortedArray);

      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }

  extractTopOrders(arr) {
    let topSevenOrders: any = [];

    for (let i = 0; i < arr.length; i++) {
      if (i < 7) {
        topSevenOrders.push(arr[i]);
      }
      if (i == 7) {
        break;
      }
    }
    return topSevenOrders;
  }

  openOrderDialog(order) {
    this.salesService.currentTab = 'View Order Status';
    this.dialog.open(DialogOrderManagementComponent, {
      height: '600px',
      width: '1000px',
      data: order,
      disableClose: true
    });
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

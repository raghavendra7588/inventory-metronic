import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogOrderManagementComponent } from 'src/app/pages/sales/dialog-order-management/dialog-order-management.component';
import { SalesService } from 'src/app/pages/sales/sales.service';

@Component({
  selector: 'app-advance-tables-widget9',
  templateUrl: './advance-tables-widget9.component.html',
})
export class AdvanceTablesWidget9Component {
  @Input() cssClass;
  orderData: any = [];
  strSellerId: string;

  constructor(
    public salesService: SalesService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {

    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.getOrderListData(this.strSellerId);
  }


  getOrderListData(userId) {
    this.spinner.show();
    this.salesService.getOrderList(userId).subscribe(res => {
      console.log('order stats ****************', res);
      this.orderData = res;
      let sortedArray = this.orderData.sort((a, b) => parseFloat(b.totalAmount) - parseFloat(a.totalAmount));
      this.orderData = this.extractTopOrders(sortedArray);
      console.log('sortedArray', sortedArray);
      console.log('this.orderData', this.orderData);
      console.log('this.orderData', this.orderData.length);
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
}

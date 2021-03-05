import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SalesService } from 'src/app/pages/sales/sales.service';
import { EmitterService } from 'src/app/shared/emitter.service';

@Component({
  selector: 'app-advance-tables-widget1',
  templateUrl: './advance-tables-widget1.component.html',
})
export class AdvanceTablesWidget1Component implements OnInit {
  @Input() cssClass: '';
  strSellerId: string;
  orderData: any = [];

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.getOrderListData(this.strSellerId);
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
      console.log('order stats ****************', res);
      this.orderData = res;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SalesService } from 'src/app/pages/sales/sales.service';
import { EmitterService } from 'src/app/shared/emitter.service';

@Component({
  selector: 'app-base-tables-widget2',
  templateUrl: './base-tables-widget2.component.html',
})
export class BaseTablesWidget2Component implements OnInit {

  strSellerId: string;
  @Input() cssClass: string;
  topProductsData: any = [];

  constructor(
    public salesService: SalesService,
    private spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) { }

  ngOnInit(): void {

    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.topSevenPurchaseProducts();
  }




  topSevenPurchaseProducts() {
    this.salesService.getTopFiveProductsBySellerId(this.strSellerId).subscribe(data => {
      this.topProductsData = data;
      console.log('this.topProductsData ', this.topProductsData);
      if (this.topProductsData && this.topProductsData.length) {
        this.emitterService.isResponseLoaded.emit(true);
      }
    });
  }
}

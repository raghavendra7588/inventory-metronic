import { Component, Input, OnInit } from '@angular/core';
import { EmitterService } from 'src/app/shared/emitter.service';
import * as _ from 'lodash';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base-tables-widget6',
  templateUrl: './base-tables-widget6.component.html',
})
export class BaseTablesWidget6Component implements OnInit {

  fastestMovingDataByMonth: any = [];
  role: string;

  TABS: string[] = [
    'Month',
    'Week',
    'Day'
  ];
  currentTab;
  @Input() cssClass: string;
  strSellerId: string;

  productData$: Observable<any>;

  constructor(
    private reportsService: ReportsService,
    private emitterService: EmitterService
  ) {
    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.role = sessionStorage.getItem('role');

    this.emitterService.isLoggedIn.subscribe(val => {
      if (val) {
        this.getFastestMoVingProductsByMonth();
        // this.getFastestMovingData();
      }
    });
  }

  ngOnInit(): void {
    this.currentTab = this.TABS[0];
    // this.productData$ = this.reportsService.getFastestMovingDataByMonth(this.strSellerId);
    this.getFastestMoVingProductsByMonth();
  
  }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

  getFastestMoVingProductsByMonth() {
    if (this.role == 'Admin') {
      this.strSellerId = '2';
    }
    this.reportsService.getFastestMovingDataByMonth(this.strSellerId).subscribe(res => {
      this.fastestMovingDataByMonth = res;

      let uniqueRecordsByVendors = _.uniqBy(this.fastestMovingDataByMonth, 'PurchaseOrderItemId');
      this.fastestMovingDataByMonth = uniqueRecordsByVendors;
      setTimeout(() => this.fastestMovingDataByMonth = this.fastestMovingDataByMonth);

    });
  }

  getFastestMovingData() {

    this.reportsService.getFastestMovingDataByMonth(this.strSellerId);
  }
  // public displayResponse() {
  //   alert('called');
  //   this.getFastestMoVingProductsByMonth();
  // }
  // ngAfterViewInit() {
  //   this.namedElement.nativeElement.click();
  // }
}

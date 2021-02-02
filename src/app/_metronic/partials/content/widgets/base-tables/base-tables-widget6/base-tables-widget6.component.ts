import { Component, Input, OnInit } from '@angular/core';
import { EmitterService } from 'src/app/shared/emitter.service';
import * as _ from 'lodash';
import { ReportsService } from 'src/app/pages/reports/reports.service';

@Component({
  selector: 'app-base-tables-widget6',
  templateUrl: './base-tables-widget6.component.html',
})
export class BaseTablesWidget6Component implements OnInit {

  fastestMovingDataByMonth: any = [];

  TABS: string[] = [
    'Month',
    'Week',
    'Day'
  ];
  currentTab;
  @Input() cssClass: string;
  strSellerId: string;

  constructor(
    private reportsService: ReportsService,
    private emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    this.currentTab = this.TABS[0];
    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.getFastestMoVingProductsByMonth();
  }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

  getFastestMoVingProductsByMonth() {
    this.reportsService.getFastestMovingDataByMonth(this.strSellerId).subscribe(res => {
      this.fastestMovingDataByMonth = res;

      let uniqueRecordsByVendors = _.uniqBy(this.fastestMovingDataByMonth, 'PurchaseOrderItemId');
      this.fastestMovingDataByMonth = uniqueRecordsByVendors;
      setTimeout(() => this.fastestMovingDataByMonth = this.fastestMovingDataByMonth);
      // console.log('ddata ** ', this.fastestMovingDataByMonth);
    });
  }
}

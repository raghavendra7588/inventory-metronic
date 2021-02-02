import { isQuote } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

import { EmitterService } from 'src/app/shared/emitter.service';
import * as _ from 'lodash';

import * as moment from 'moment';
import { MonthData } from 'src/app/pages/reports/reports.model';
import { ReportsService } from 'src/app/pages/reports/reports.service';

@Component({
  selector: 'app-lists-widget14',
  templateUrl: './lists-widget14.component.html',
})
export class ListsWidget14Component implements OnInit {
  @Input() cssClass;
  @Input() rowNumber;

  strSellerId: string;
  fastestMovingDataByMonth: any = [];
  monthData: MonthData = new MonthData();

  highestValueProductsByMonth: any = [];
  highestValueProductsByLastMonth: any = [];
  currentTab: string = 'currentMonth';
  currentlySelectedMenu: string = 'Current Month';

  constructor(
    private reportsService: ReportsService,
    private emitterService: EmitterService
  ) {

    let startOfMonth = moment().clone().startOf('month').format("DD/MM/YYYY");
    this.monthData.startDateOfMonth = startOfMonth;
    // console.log('start', startOfMonth);

    let startDateOfLastMonth = moment().subtract(1, 'months').startOf('month').format("DD/MM/YYYY");
    // console.log('startDateOfLastMonth', startDateOfLastMonth);
    this.monthData.startDateOfLastMonth = startDateOfLastMonth;
  }

  ngOnInit(): void {
    if (!this.rowNumber) {
      this.rowNumber = 5;
    }
    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.monthData.sellerId = this.strSellerId;

    this.getHighestValueProductsByMonthData();
    this.getHighestValueProductsByLastMonthData();
  }



  getHighestValueProductsByMonthData() {
    this.reportsService.getHighestValueProductByMonth(this.monthData).subscribe(res => {
      this.highestValueProductsByMonth = res;
    });
  }

  getHighestValueProductsByLastMonthData() {
    this.reportsService.getHighestValueProductByLastMonth(this.monthData).subscribe(res => {
      this.highestValueProductsByLastMonth = res;
      // console.log('^^^^^^^^ last month', res);
    });
  }

  currentMonth() {
    this.currentTab = 'currentMonth';
    this.currentlySelectedMenu = 'Current Month';
  }

  lastMonth() {
    this.currentTab = 'lastMonth';
    this.currentlySelectedMenu = 'Last Month';
  }
}
